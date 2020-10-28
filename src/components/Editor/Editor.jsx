import React from 'react';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { DOMAIN, API_MEMBER_UPLOAD } from '../../assets/js/api';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: [//富文本配置
        {
          key: 'bold',
          text: <b>加粗</b>
        },
        'italic', 'underline', 'separator', 'link', 'separator', 'media', 'emoji'
      ]
    };
  }
  render() {
    return (
      <div className="braftEditor">
        <BraftEditor
          value={BraftEditor.createEditorState(this.props.editorValue)}
          onChange={this.handleChange}// 监听富文本内容变化
          contentStyle={{height: 350,}}// 文本框高度
          media={{uploadFn: this.myUploadFn, onInsert: this.myInsert}}//媒体库回调事件
        />
      </div>
    )
  }
  // 获取富文本内容
  handleChange =(e)=> {
    this.props.EditorChange(e);
  }
  // 点击媒体库上传图片
  myUploadFn =(param)=> {
    const url = DOMAIN + API_MEMBER_UPLOAD;//图片上传地址
    const formData = new FormData();//图片格式处理函数
    formData.append('files', param.file);//添加到图片处理函数

    // 发送请求到后端
    React.$axios.post(url, formData).then((res) => {
      // 上传成功后回显媒体库弹窗图片
      param.success({
        url: res.files[0].thumbnailUrlAll,
        meta: {
          id: 'xxx',
          title: 'xxx',
          alt: 'xxx',
        }
      })
      
      // 上传发生错误时调用param.error
      param.error({
        msg: '上传图片失败'
      })
    })
  }
}