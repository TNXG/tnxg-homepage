import {
    AggregateController,
    NoteController,
    PageController,
    PostController,
    CategoryController,
    createClient,
} from '@mx-space/api-client'

import { fetchAdaptor } from '@mx-space/api-client/dist/adaptors/fetch'

export const apiClient = createClient(fetchAdaptor)('https://mx.tnxg.top/api/v2', {
    controllers: [
        PostController,
        NoteController,
        PageController,
        CategoryController,
        AggregateController,
    ],
})

export default defineEventHandler(async () => {
    const postsList = await apiClient.post.getList();
    const allBlogPosts = postsList.data;

    const transformedPosts = allBlogPosts.map(post => ({
        id: post.id,
        created: post.created, // 创建日期
        modified: post.modified, // 修改日期
        title: post.title, // 标题
        url: `https://tnxgmoe.com/posts/${post.category.slug}/${post.slug}`,
        summary: post.summary, // 摘要
        cover: post.images && post.images[0] ? post.images[0].src : '',
    }));

    return transformedPosts;
});