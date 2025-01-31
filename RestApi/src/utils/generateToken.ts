import jwt from 'jsonwebtoken';


//generate token

export const generateToken = (id: string) => {
    return jwt.sign(
        { id }, `${process.env.JWT_SECRET}`, {
        expiresIn: 60 * 60 * 24
    })
}