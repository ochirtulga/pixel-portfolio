// src/services/emailService.js
// Mailto approach (opens user's default email client)
export const sendMailtoEmail = (formData) => {
  const subject = encodeURIComponent(`${formData.contactType} Quest from ${formData.name}`);
  const body = encodeURIComponent(`
Name: ${formData.name}
Contact Type: ${formData.contactType}
Email: ${formData.email || 'Not provided'}

Message:
${formData.message}

---
Sent from your Pixel Portfolio contact form
  `);
  
  const mailtoLink = `mailto:ochirtulgan@gmail.com?subject=${subject}&body=${body}`;
  
  // Try to open the mailto link
  try {
    window.location.href = mailtoLink;
    return { 
      success: true, 
      message: 'Opening your email client... Please send the message from there! 📧' 
    };
  } catch (error) {
    console.error('Failed to open email client:', error);
    return {
      success: false,
      message: 'Failed to open email client. Please copy the message and email manually.'
    };
  }
};