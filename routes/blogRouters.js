const blogCtrl = require('../controllers/blogController')
const auth = require('../middlewares/auth');
const router = require('express').Router()

    router.get('/all', blogCtrl.getAllBlogs)
    router.post('/newblog',auth, blogCtrl.createNewBlog)
    router.get('/current/:id',auth, blogCtrl.getBlogById)
    router.put('/update',auth, blogCtrl.updateBlogById)

module.exports = router