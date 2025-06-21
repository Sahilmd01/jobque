import {Webhook} from 'svix'
import User from '../models/User.js'


//API controller function to manage clerk userwidth database
export const clerkWebhooks = async (req, res) => {
    try {
        //Create svix instance with clerk webhook secret
        const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)

        //Verifying Header
        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        })

        //Getting data from req body
        const {data, type} = req.body

        //Switvh case for differrnt events
        switch (type) {
            case 'user.created':{
                //logic to save user in database
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(userData)
                res.json({})
                break;
            }
            //logic to update user data    
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }
            //logic to delete user 
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
        
            default:
                break;
        }

         
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
