interface ResumeData {
    name: string;
    email: string;
    phone: string;
    address: string;
    photo?: string;
    skills: string[];
    education: string;
    experience: {
        company: string;
        designation: string;
        details: string;
    };
    languages: string[];
}

// Form submission handler
function handleFormSubmit(event: Event): void {
    event.preventDefault();

    // Access the file input for the photo
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    let photoSrc = '';

    // Check if a photo is uploaded and read it as a Data URL
    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            photoSrc = e.target?.result as string || '';
            submitFormWithPhoto(photoSrc);
        };

        reader.readAsDataURL(file);
    } else {
        submitFormWithPhoto('');
    }
}

// Separate function to handle form data submission after reading the photo
function submitFormWithPhoto(photoSrc: string): void {
    const resumeData: ResumeData = {
        name: (document.getElementById('name') as HTMLInputElement).value.trim(),
        email: (document.getElementById('email') as HTMLInputElement).value.trim(),
        phone: (document.getElementById('phone') as HTMLInputElement).value.trim(),
        address: (document.getElementById('address') as HTMLInputElement).value.trim(),
        photo: photoSrc,
        skills: (document.getElementById('skills') as HTMLTextAreaElement).value.trim().split('\n'),
        education: (document.getElementById('education') as HTMLTextAreaElement).value.trim(),
        experience: {
            company: (document.getElementById('company-name') as HTMLInputElement).value.trim(),
            designation: (document.getElementById('designation-name') as HTMLInputElement).value.trim(),
            details: (document.getElementById('experience-details') as HTMLTextAreaElement).value.trim(),
        },
        languages: (document.getElementById('languages') as HTMLTextAreaElement).value.trim().split('\n'),
    };

    generateResumePreview(resumeData);
}

// Function to generate and display the editable resume preview
function generateResumePreview(data: ResumeData): void {
    const previewElement = document.getElementById('resume-preview') as HTMLElement;

    if (!previewElement) {
        console.error('Could not find resume-preview element.');
        return;
    }

    // Scroll into view to enhance user experience
    previewElement.scrollIntoView({ behavior: 'smooth' });

    // Dynamically generate the editable resume content
    previewElement.innerHTML = `
        <div>
            ${data.photo ? `<img src="${data.photo}" alt="Profile Photo" class="profile-photo">` : ''}
            <h2>Editable Resume by Aiysha Noor</h2>
            <section class="sec1">
                <h2><input type="text" id="edit-name" value="${data.name}" /></h2>
                <p><strong>Email:</strong> <input type="email" id="edit-email" value="${data.email}" /></p>
                <p><strong>Phone:</strong> <input type="tel" id="edit-phone" value="${data.phone}" /></p>
                <p><strong>Address:</strong> <input type="text" id="edit-address" value="${data.address}" /></p>
            </section>
            <section class="sec2">
                <h3>Education</h3>
                <textarea id="edit-education">${data.education}</textarea>
                <h3>Experience</h3>
                <p><strong>Company:</strong> <input type="text" id="edit-company" value="${data.experience.company}" /></p>
                <p><strong>Designation:</strong> <input type="text" id="edit-designation" value="${data.experience.designation}" /></p>
                <p><strong>Details:</strong> <textarea id="edit-details">${data.experience.details}</textarea></p>
                <h3>Skills</h3>
                <textarea id="edit-skills">${data.skills.join('\n')}</textarea>
                <h3>Languages</h3>
                <textarea id="edit-languages">${data.languages.join('\n')}</textarea>
            </section>
            <button id="save-resume">Save</button>
        </div>
    `;

    // Attach save event listener
    const saveButton = document.getElementById('save-resume') as HTMLButtonElement;
    if (saveButton) {
        saveButton.addEventListener('click', saveResume);
    }
}

// Function to save the edited resume data
function saveResume(): void {
    const resumeData: ResumeData = {
        name: (document.getElementById('edit-name') as HTMLInputElement).value.trim(),
        email: (document.getElementById('edit-email') as HTMLInputElement).value.trim(),
        phone: (document.getElementById('edit-phone') as HTMLInputElement).value.trim(),
        address: (document.getElementById('edit-address') as HTMLInputElement).value.trim(),
        skills: (document.getElementById('edit-skills') as HTMLTextAreaElement).value.trim().split('\n'),
        education: (document.getElementById('edit-education') as HTMLTextAreaElement).value.trim(),
        experience: {
            company: (document.getElementById('edit-company') as HTMLInputElement).value.trim(),
            designation: (document.getElementById('edit-designation') as HTMLInputElement).value.trim(),
            details: (document.getElementById('edit-details') as HTMLTextAreaElement).value.trim(),
        },
        languages: (document.getElementById('edit-languages') as HTMLTextAreaElement).value.trim().split('\n'),
    };

    console.log('Updated Resume Data:', resumeData);
}

// Initialize form when the document is fully loaded
function initializeForm(): void {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Could not find resume-form element.');
    }
}

window.addEventListener('DOMContentLoaded', initializeForm);
