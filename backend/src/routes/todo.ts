import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { createTodoSchema, updateTodoSchema } from "../schemas/todo";
import { prisma } from "../prisma";
import { PassThrough } from "node:stream";
const router = Router();

router.use(authMiddleware);

//Create
router.post('/', async(req : AuthRequest , res)=>{
    const parsed = createTodoSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({
            message : "Invalid Input"
        })
    }

    const title = parsed.data.title;
    const todo = await prisma.todo.create({
        data : {
            title,
            userId : req.userId!
        }
    })

    res.status(201).json({todo})
})

//Read
router.get('/', async(req : AuthRequest, res )=>{
    const todos = await prisma.todo.findMany({
        where : {
            userId : req.userId!
        },
        orderBy: { createdAt: "desc" },
    })
    res.status(201).json({todos})
})

//Update
router.put('/:id', async(req : AuthRequest, res)=>{
    const parsed = updateTodoSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({
            message : "Invalid Inputs!"
        })
    };
    const {id} = req.params;
    const userId = req.userId;
    if(!id || !userId){
        return res.status(400).json({
            message : "Invalid request!"
        })
    }

    //because we have mentioned the title and the completed as optional in the zod schemas prisma does not accept it as undefined 
    // thus it will show the type issue
    const updatedData : Record<string, any> = {}
    if(parsed.data.title !== undefined){
        updatedData.title = parsed.data.title;
    }
    if(parsed.data.completed !== undefined){
        updatedData.completed = parsed.data.completed;
    }


    const todo = await prisma.todo.updateMany({
        where : {
            id,
            userId
        },
        data : updatedData
    });

    if (todo.count === 0) {
    return res.status(404).json({ message: "Todo not found" });
    }

    res.json({
        message : "Updated!"
    })
})
 
//Delete 
router.delete(":/id", async(req : AuthRequest, res)=>{
    const {id } = req.params;
    const userId = req.userId;
    if(!id || !userId){
        return res.status(400).json({
            message : "Invalid request!"
        })
    }

    const deleted = await prisma.todo.deleteMany({
        where : {
            id,
            userId
        }
    });

    if(deleted.count === 0){
        return res.status(401)
    }

    res.json({
        message : "Deleted!"
    })
})

export default router;