document.getElementById('generate-btn').addEventListener('click', generateResume);

function generateResume() {
    // Hide the generate button
    document.getElementById('generate-btn').style.display = 'none';

    // Capture input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    const photo = document.getElementById('upload').files[0];

    // Check if required fields are filled
    if (!name || !email || !phone) {
        alert("Please fill in all required fields: Name, Email, and Phone.");
        return;
    }

    // Replace main container content with resume
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = ''; // Clear existing content

    // Create new content for resume
    const resumeHTML = `
    <div class="pdf-wrapper"> <!-- Wrapper for centering in PDF -->
        <h2>Resume</h2>
        <div class="resume-content">
            <div id="photo-container"></div> <!-- Photo will be added here -->
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>LinkedIn:</strong> ${linkedin}</p>
            <p><strong>GitHub:</strong> ${github}</p>
            <p><strong>Experience:</strong><br> ${experience.replace(/\n/g, "<br>")}</p>
            <p><strong>Education:</strong><br> ${education.replace(/\n/g, "<br>")}</p>
        </div>
        <button id="download-btn" class="submit">Download as PDF</button>
    </div>
`;

    mainContainer.innerHTML = resumeHTML;

    // Display uploaded photo if it exists
    if (photo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const photoContainer = document.getElementById('photo-container');
            const image = document.createElement('img');
            image.src = e.target.result;
            image.alt = "Uploaded Photo";
            image.style.width = '150px';
            image.style.height = '150px';
            image.style.borderRadius = '50%';
            photoContainer.appendChild(image);
        };
        reader.readAsDataURL(photo);
    }

    // Add event listener for the download button
    document.getElementById('download-btn').addEventListener('click', downloadPDF);
}

// Function to download resume as PDF
function downloadPDF() {
    const mainContainer = document.getElementById('main-container');

    // Hide the download button temporarily
    const downloadButton = document.getElementById('download-btn');
    downloadButton.style.display = 'none';

    // Options for pdf generation
    const options = {
        margin:       0.5,
        filename:     'resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate the PDF
    html2pdf().set(options).from(mainContainer).save().then(() => {
        // Show the download button again after PDF generation
        downloadButton.style.display = 'block';
    });
}
