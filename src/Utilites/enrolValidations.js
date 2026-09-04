export function validateFirstName(value) {
    const v = (value || '').trim();

    if (!v) return 'First name is required';
    if (v.length < 2) return 'First name must be at least 2 characters';
    if (v.length > 50) return 'First name must not exceed 50 characters';

    if (!/^[A-Za-z' -]+$/.test(v)) {
        return 'First name can only contain letters, spaces, hyphens and apostrophes';
    }

    return null;
}

export function validateLastName(value) {
    const v = (value || '').trim();

    if (!v) return 'Last name is required';
    if (v.length < 2) return 'Last name must be at least 2 characters';
    if (v.length > 50) return 'Last name must not exceed 50 characters';

    if (!/^[A-Za-z' -]+$/.test(v)) {
        return 'Last name can only contain letters, spaces, hyphens and apostrophes';
    }

    return null;
}

export function validateEmail(value) {
    const v = (value || '').trim();

    if (!v) return 'Email address is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(v)) {
        return 'Please enter a valid email address';
    }

    if (v.length > 254) {
        return 'Email address is too long';
    }

    return null;
}

export function validatePhoneNumber(value) {
    const v = (value || '').trim();

    if (!v) return 'Phone number is required';

    const cleaned = v.replace(/[\s\-()]/g, '');

    const kenyanRegex = /^(?:\+254|254|0)(7|1)\d{8}$/;
    const genericIntlRegex = /^\+?[1-9]\d{7,14}$/;

    if (!kenyanRegex.test(cleaned) && !genericIntlRegex.test(cleaned)) {
        return 'Please enter a valid phone number (e.g. 0712345678 or +254712345678)';
    }

    return null;
}

export function validateAdmissionForm(formData) {
    const errors = {};

    const firstNameError = validateFirstName(formData.firstName);
    if (firstNameError) {
        errors.firstName = firstNameError;
    }

    const lastNameError = validateLastName(formData.lastName);
    if (lastNameError) {
        errors.lastName = lastNameError;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
        errors.email = emailError;
    }

    const phoneError = validatePhoneNumber(formData.phoneNumber);
    if (phoneError) {
        errors.phoneNumber = phoneError;
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}