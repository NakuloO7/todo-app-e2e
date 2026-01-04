import { Router } from "express";
import bcrypt from 'bcrypt';
import {prisma} from '../prisma'
import { SigninSchema, SignupSchema } from "../schemas/auth";
import { signJWT } from "../utils/jwt";



const router = Router();

router.post('/signup', async(req, res)=>{
    //zod validation 
    const parsed = SignupSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({
            message : "Invalid Inputs!"
        })
    }

    const {email, password} = parsed.data;

    const existingUser = await prisma.user.findUnique({
        where : {
            email
        }
    });
    if(existingUser){
        return res.status(409).json({
            message : "User already exists!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data : {
            email, 
            password : hashedPassword
        }
    });
    const token = signJWT(user.id);

    res.cookie("token", token, {
        httpOnly : true, 
        sameSite : 'lax',
        secure : false,  //true in production for https
    });

    res.json({ message: "Signup successful" });
})


router.post('/signin', async(req , res)=>{
    const parsed = SigninSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({
            message : "Invalid Inputs!"
        })
    }

    const {email, password} = parsed.data;
    const user = await prisma.user.findUnique({
        where : {
            email
        }
    })

    if(!user){
        return res.status(401).json({
            message : "Invalid credentials!"
        })
    }

    const valid = await bcrypt.compare(password, user.password);
    if(!valid){
        return res.status(401).json({
            message : "Invalid Credentails"
        })
    }

    const token = signJWT(user.id);
    res.cookie("token", token, {
        httpOnly : true,
        sameSite : 'lax',
        secure : false
    });

    res.json({
        message : "Signin successfull!"
    })

})

router.post('/logout', async(req , res)=>{
    res.clearCookie("token");
    res.json({
        message : "logged out"
    })
})

export default router;