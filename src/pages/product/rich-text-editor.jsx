import React, { useEffect, useState, useImperativeHandle } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
function RichTextEditor(props) {

    const [editorState, seteditorState] = useState()

    function onEditorStateChange(editorState) {
        seteditorState(editorState)
    };

    const getDetail = () => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }

    //用useImperativeHandle暴露一些外部ref能访问的属性
    useImperativeHandle(props.onRef, () => {
        return {
            getDetail: getDetail,
        };
    });

    useEffect(() => {
        if (props.details.length > 0) {
            const html = props.details
            const contentBlock = htmlToDraft(html)
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            seteditorState(editorState)
        } else {
            seteditorState(EditorState.createEmpty())
        }
    }, [])

    return (
        <Editor
            editorState={editorState}
            editorStyle={{ border: '1px solid black', minHeight: 200, paddingLeft: 10 }}
            onEditorStateChange={onEditorStateChange}
        />
    );
}

export default RichTextEditor
