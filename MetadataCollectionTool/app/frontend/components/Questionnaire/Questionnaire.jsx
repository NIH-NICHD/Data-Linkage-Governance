import React, { useEffect } from 'react';
import './style.css'

import FileSaver from 'file-saver';

// LHC-Forms doesn't support traditional import of an npm package
import 'lforms/dist/lforms/webcomponent/styles.css'
import 'lforms/dist/lforms/webcomponent/assets/lib/zone.min.js'
import 'lforms/dist/lforms/webcomponent/lhc-forms.js'
import 'lforms/dist/lforms/fhir/R4/lformsFHIR.min.js'

// Load the questionnaire
import questionnaire from './Research-data-metadata.R4.json'


const Questionnaire = props => {
    let id = window.location.href.match(/questionnaire_response\/(\d+)\/edit/)?.[1];
    let relative_base = id ? '../..' : '..'
    const apiPrefix = `${relative_base}/api/v1/questionnaire_response`;
    const jsonHeaders = { "Content-Type": "application/json" };

    const saveForm = () => {
        const response = LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', 'formContainer');
        if (id) {
            updateForm(response);
        } else {
            createForm(response);
        }
    }
    const createForm = (response) => {
        fetch(apiPrefix,
            { method: 'POST', body: JSON.stringify(response), headers: jsonHeaders }).then((_) => {
                //alert('Successfully saved questionnaire');
                window.location.href = relative_base;
            }).catch((e) => {
                handleError(e); // todo: log errors?
            });
    }
    const updateForm = (response) => {
        fetch(`${apiPrefix}/${id}.json`,
            { method: 'PUT', body: JSON.stringify(response), headers: jsonHeaders }).then((_) => {
                //alert('Successfully updated questionnaire');
                window.location.href = relative_base;
            }).catch((e) => {
                handleError(e); // todo: log errors?
            });
    }
    const getForm = async (qId) => {
        const response = await fetch(`${apiPrefix}/${qId}`).then((res) => {
            return res.json();
        })
        return response.resource;
    }

    const downloadFHIR = () => {
        const response = LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', 'formContainer');
        const blob = new Blob([JSON.stringify(response, null, 2)], { type: "application/json" });
        FileSaver.saveAs(blob, 'GovernanceDataResponse.json')
    }

    const uploadFHIR = (event) => {
        event.preventDefault();
        const file = event.target.files[0]
        const reader = new FileReader();
        reader.onload = (event) => {
            // Grab the JSON, build the form, and add the response in
            const response = event.target.result;
            const formDefinition = LForms.Util.convertFHIRQuestionnaireToLForms(questionnaire, 'R4');
            const filledForm = LForms.Util.mergeFHIRDataIntoLForms('QuestionnaireResponse', JSON.parse(response), formDefinition, 'R4')
            LForms.Util.addFormToPage(filledForm, 'formContainer');
            // Clear the upload so we can upload the same file more than once
            event.target.value = null;
        }
        reader.readAsBinaryString(file);
    }

    const handleUploadClick = (event) => {
      document.getElementById('uploadControl').click();
    }

    const handleError = (err) => {
        console.error(err);
        alert('There was an issue saving the questionnaire');
    }

    useEffect(async () => {
        const formDefinition = LForms.Util.convertFHIRQuestionnaireToLForms(questionnaire, 'R4');
        let renderForm = questionnaire;
        if (id) {
            const savedForm = await getForm(id);
            if (savedForm) {
                renderForm = LForms.Util.mergeFHIRDataIntoLForms('QuestionnaireResponse', savedForm, formDefinition, 'R4')
            }
        }
        LForms.Util.addFormToPage(renderForm, 'formContainer');
    }, []);

    return (
        <div>
            <div id='formContainer'>
                {/* lform goes here */}
            </div>
            <div class="lhc-form more-buttons">
                <button type="button" class="lhc-float-button lhc-button actionButton" id="saveButton" onClick={saveForm}>Save</button>
                <button type="button" class="lhc-float-button lhc-button actionButton" id="downloadButton" onClick={downloadFHIR}>Download as FHIR</button>
                <button type="button" class="lhc-float-button lhc-button actionButton" id="uploadButton" onClick={handleUploadClick}>
                    Upload FHIR
                    <input type="file" accept=".json" hidden id="uploadControl" onChange={uploadFHIR} />
                </button>
            </div>
        </div>


    )
}

export default Questionnaire;