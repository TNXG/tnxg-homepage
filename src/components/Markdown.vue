<script>
import MarkdownIt from 'markdown-it'

export default {
    name: 'MarkdownRender', // 设置组件名称
    props: {
        content: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            renderedMarkdown: ''
        }
    },
    watch: {
        content: {
            immediate: true,
            handler(newValue) {
                const md = new MarkdownIt({
                    html: true,
                })
                // 自定义渲染规则：为所有的 img 标签添加 TailwindCSS 类
                md.renderer.rules.image = (tokens, idx, options, env, self) => {
                    tokens[idx].attrPush(['class', 'max-w-52'])
                    return self.renderToken(tokens, idx, options)
                }

                this.renderedMarkdown = md.render(newValue)
            }
        }
    }
}
</script>

<template>
    <div id="markdown" v-html="renderedMarkdown"></div>
</template>