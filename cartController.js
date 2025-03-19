const Cart = require("../models/Cart")

exports.addToCart = async(req,res)=>{
    const {productId, name,price} = req.body

    if(!productId){
        return res.status(400).json({message: "Product ID is missing"})
    }

    let cart = await Cart.findOne({userId: req.user.id})
    if(!cart){
        cart = new Cart({userId: req.user.id, items:[]})
    }

    const existingItem = cart.items.find((item)=>
         item.productId && item.productId.toString() === productId.toString())
    
    if(existingItem){
        existingItem.quantity += 1
    }else{
        cart.items.push({productId, name, price, quantity: 1})
    }

    await cart.save()
    res.json({cart,message:"Item added to Cart"})
}

exports.getCart = async(req,res)=>{
    const cart = await Cart.findOne({userId: req.user.id})
    res.json(cart ? cart.items : [])
}

exports.removeFromCart= async(req,res)=>{
    const{ productId} = req.body
    let cart = await Cart.findOne({userId: req.user.id})
    if(!cart) return res.status(400).json({message: "Cart not found"})

    cart.items = cart.items.filter((item)=>item.productId !== productId)
    await cart.save()
    res.json({cart, message: "Item removed from Cart"})
}