import {
    AggregateController,
    NoteController,
    PageController,
    PostController,
    CategoryController,
    createClient,
    AIController
} from '@mx-space/api-client'

import { fetchAdaptor } from '@mx-space/api-client/dist/adaptors/fetch'

export const apiClient = createClient(fetchAdaptor)('https://mx.tnxg.top/api/v2', {
    controllers: [
        PostController,
        NoteController,
        PageController,
        CategoryController,
        AggregateController,
        AIController
    ],
})

export default defineEventHandler(async () => {
    const postsList = await apiClient.post.getList();
    const allBlogPosts = postsList.data;
    const notesList = await apiClient.note.getList();
    const allBlogNotes = notesList.data;
    const transformedNotes = await Promise.all(allBlogNotes.map(async note => {
        const summary = await apiClient.ai.getSummary({ articleId: note.id, lang: 'zh' });
        return {
            id: note.id,
            created: note.created, // 创建日期
            modified: note.modified, // 修改日期
            title: note.title, // 标题
            url: `https://tnxgmoe.com/notes/${note.nid}`,
            summary: summary.summary, // 摘要
            cover: note.images && note.images[0] ? note.images[0].src : '',
        };
    }));
    const transformedPosts = allBlogPosts.map(post => ({
        id: post.id,
        created: post.created, // 创建日期
        modified: post.modified, // 修改日期
        title: post.title, // 标题
        url: `https://tnxgmoe.com/posts/${post.category.slug}/${post.slug}`,
        summary: post.summary, // 摘要
        cover: post.images && post.images[0] ? post.images[0].src : '',
    }));

    return [...transformedPosts, ...transformedNotes].sort((a, b) => {
        return new Date(b.created) - new Date(a.created);
    });
});