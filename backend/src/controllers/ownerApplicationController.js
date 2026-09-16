import OwnerApplication from '../models/OwnerApplication.js';

const REQUIRED_FIELDS = [
    'fullName', 'email', 'phone',
    'address', 'city', 'province', 'postalCode',
    'bankName', 'accountHolder', 'accountNumber', 'accountType', 'branchCode'
];

export const submitApplication = async (req, res) => {
    try {
        const missing = REQUIRED_FIELDS.filter((f) => !req.body[f]?.toString().trim());
        if (missing.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missing.join(', ')}`
            });
        }

        const existing = await OwnerApplication.findByUserId(req.user.id);
        if (existing?.status === 'approved') {
            return res.status(409).json({
                message: 'You are already an approved owner.'
            });
        }

        const application = await OwnerApplication.upsert(req.user.id, req.body);

        res.status(200).json({
            message: 'Your owner application has been submitted successfully.',
            application: {
                status: application.status,
                createdAt: application.created_at,
            }
        });
    } catch (err) {
        console.error('Submit owner application error:', err);
        res.status(500).json({ message: 'Something went wrong while submitting your application.' });
    }
};

// Used by BecomeAnOwner.vue on load, so a returning applicant sees their
// current status instead of a blank form.
export const getMyApplication = async (req, res) => {
    try {
        const application = await OwnerApplication.findByUserId(req.user.id);
        res.status(200).json({ application });
    } catch (err) {
        console.error('Get my owner application error:', err);
        res.status(500).json({ message: 'Something went wrong while fetching your application.' });
    }
};

// Admin-only from here down.

export const listApplications = async (req, res) => {
    try {
        const { status } = req.query;
        const applications = await OwnerApplication.findAll({ status });
        res.status(200).json({ applications });
    } catch (err) {
        console.error('List owner applications error:', err);
        res.status(500).json({ message: 'Something went wrong while fetching applications.' });
    }
};

export const approveApplication = async (req, res) => {
    try {
        const updated = await OwnerApplication.updateStatus(req.params.id, 'approved', req.user.id);
        if (!updated) {
            return res.status(404).json({ message: 'Application not found.' });
        }
        res.status(200).json({ message: 'Application approved.' });
    } catch (err) {
        console.error('Approve owner application error:', err);
        res.status(500).json({ message: 'Something went wrong while approving the application.' });
    }
};

export const rejectApplication = async (req, res) => {
    try {
        const updated = await OwnerApplication.updateStatus(req.params.id, 'rejected', req.user.id);
        if (!updated) {
            return res.status(404).json({ message: 'Application not found.' });
        }
        res.status(200).json({ message: 'Application rejected.' });
    } catch (err) {
        console.error('Reject owner application error:', err);
        res.status(500).json({ message: 'Something went wrong while rejecting the application.' });
    }
};