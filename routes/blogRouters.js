const blogCtrl = require('../controllers/blogController')
const auth = require('../middlewares/auth');
const router = require('express').Router()

    router.get('/all', blogCtrl.getAllBlogs)
    router.post('/newblog',auth, blogCtrl.createNewBlog)
    router.get('/current/:id',auth, blogCtrl.getBlogById)
    router.put('/update',auth, blogCtrl.updateBlogById)
    router.put('/comment',auth, blogCtrl.createComment)
    router.put('/like/:id',auth, blogCtrl.likeBlog)
    router.put('/dislike/:id',auth, blogCtrl.disLikeBlog)
    router.delete('/delete/:id',auth, blogCtrl.deleteBlogById)

module.exports = router