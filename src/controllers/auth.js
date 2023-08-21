import bcryptjs from 'bcryptjs'
import { userSignin, userSignup } from '../validate/index.js'
import { user } from '../models/index.js'
import jwt from 'jsonwebtoken'

const signup = async (req, res, next) => {
    try {
        const { error } = userSignup.validate(req.body)
        if (error) {
            return res.status(404).json({
                messages: error.message
            })
        }

        const findUser = await user.findOne({ email: req.body.email });
        if (findUser) {
            return res.status(400).json({ messages: 'Account đã tồn tại!' });
        }

        const pwHash = await bcryptjs.hash(String(req.body.password), 10)
        const data = await user.create({ ...req.body, password: pwHash, confirmPassword: undefined })


        if (!data) {
            return res.status(404).json({
                messages: 'Create account failed!'
            })
        }

        return res.status(200).json({
            messages: 'Signup successfully',
            data: {
                ...req.body,
                password: undefined,
                confirmPassword: undefined,
            }
        })
    } catch (error) {
        return res.status(404).json({
            messages: error.message
        })
    }
}

const signin = async (req, res) => {
    try {
        const { error } = userSignin.validate(req.body)
        if (error) {
            return res.status(404).json({
                messages: error.message
            })
        }

        const findUser = await user.findOne({ email: req.body.email });
        if (!findUser) {
            return res.status(404).json({
                messages: 'Account not found'
            })
        }

        const checkPassword = await bcryptjs.compare(req.body.password, findUser.password)
        if (!checkPassword) {
            return res.status(404).json({
                messages: 'Password not valid'
            })
        }

        const token = await jwt.sign({ findUser }, process.env.TOKEN, { expiresIn: 30000 })

        findUser.password = undefined;

        return res.status(200).json({
            messages: 'Signing in successfully',
            findUser,
            token
        })
    } catch (error) {
        return res.status(404).json({
            messages: error.message
        })
    }
}

// export const getLoginPage = (req, res) => {
//     res.render('login');
// }
// export const login = async (req, res) => {
//     const { email, password } = req.body;

//     const findUser = await user.find({ email });
//     const checkPassword = await bcryptjs.compare(password, findUser[0].password)

//     if (email === findUser[0].email && checkPassword) {
//         //Lưu vào session
//         req.session.email = findUser[0].email;

//         // res.redirect('/');

//         res.send(`<script>
//             alert('Đăng nhập thành công!');
//             window.location.href = '/';
//         </script>`);
//     } else {
//         res.send(`<script>
//             alert('Sai tài khoản hoặc mật khẩu!');
//             window.location.href = '/auth/signin';
//         </script>`);
//     }
// }

export default { signup, signin }