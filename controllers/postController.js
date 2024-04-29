const Post = require('../models/Post')

/* exports.getAllPost = async (req, res) => {
    const posts = await Post.find({})
    res.render('index', { posts })
} */

exports.getAllPost = async (req, res) => {
    const currentPage = req.query.page || 1
    const totalPost = await Post.find({}).countDocuments({})
    const postPerPage = 3
    const pageNumber = Math.ceil(totalPost / postPerPage)
    console.log(pageNumber)
    const posts = await Post.find({})
        .sort('-dateCreated')
        .skip( (currentPage - 1) * postPerPage )
        .limit(postPerPage)
    res.render('index', { posts, totalPost, pageNumber, currentPage })
}

exports.getPostPage = async (req, res) => {
    const foundedPost = await Post.findById(req.params.post_id)
    res.render('post', { post: foundedPost })
}

exports.createPost = async (req, res) => {
    await Post.create(req.body)
    res.redirect('/')
}

exports.deletePost = (req, res) => {
    Post.findByIdAndDelete(req.params.post_id, (err, result) => {
        if (err) console.log('silme işleminde hata oluştu \n' + err)
        console.log(result)
        res.redirect('/')
    })
}

exports.updatePost = async (req, res) => {
    const foundedPost = await Post.findById(req.params.post_id)
    foundedPost.title = req.body.title
    foundedPost.detail = req.body.detail
    foundedPost.save()
    res.redirect(`/post/${req.params.post_id}`)
}

exports.getEditPage = async (req, res) => {
    const foundedPost = await Post.findById(req.params.post_id)
    res.render('edit_post', { post: foundedPost })
}
