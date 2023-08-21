import jwt from "jsonwebtoken";

export const checkPermission = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new Error('User not found!');
        }

        const decoded = jwt.verify(token, process.env.TOKEN);

        if (decoded.findUser && decoded.findUser.role === 1) {
            next()
        } else {
            throw new Error('Ban khong co quyen lam viec nay!')
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};