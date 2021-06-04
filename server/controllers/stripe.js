import User from '../models/user'
import Stripe from 'stripe'
import {STRIPE_SECRET} from '../config/keys'
const stripe = Stripe(STRIPE_SECRET)
export const CreateConnectAccount = async (req, res) => {
    /*
    console.log("the information inside the token is here in req.user ",req.user);
    console.log("you have made the request for the api create-connect-account");
    from the req.user we can fetch the id of the current lgin user*/

    // 1->first we need to find that user in our database with the help of the id presnt in the token
    const user = await User.findById(req.user._id);
    //console.log(user);

    if (!user.stripe_account_id) {
        // 2->if the user dont have the account_id then we need to create the stripe_account_id 
        const account = await stripe.accounts.create({
            type: "express"
        })
        //console.log(account)
        // now will save the id inside the database..
        user.stripe_account_id=account.id;
        user.save();
    }
    
    let accountLink=await stripe.accountLinks.create({
        account:user.stripe_account_id,
        refresh_url:STRIPE_REDIRECT_URL,
        return_url:STRIPE_REDIRECT_URL,
        type:"account_onboarding",
    })
    // we can prefill certain information...
    accountLink=Object.assign(accountLink,{
        "stripe_user[email]":user.email || undefined,
    })
    console.log("account link is",accountLink)

}
