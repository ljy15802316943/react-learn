import React from 'react';
import './post.less'
import { Form, Input, Select, Tooltip, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Editor, Emoji } from '../../components';


const { Option } = Select;
let editorValue = '';//富文本内容
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,//控制 tooltip 显示隐藏。
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
      header: { //上传参数
        'authorization': '',
        'Platform': 7
      }
    };
  }
  render() {
    const { fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 10 }}>Upload</div>
      </div>
    );
    return (
      <div className="post">
        <div className="pageBox">
          <h1 className="title">发布帖子</h1>
          {/* 表单提交 */}
          <Form className="form">
            <Form.Item
              label="标题"
              name="标题"
              rules={[{required: true, message: 'Please input your username!',}]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="板块" label="板块" rules={[{ required: true }]}>
              <Select
                placeholder="请选择板块"
                onChange={this.selectChange}
                allowClear
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item label="标签"></Form.Item>
            <Form.Item label="内容">
              {/* 富文本编辑 */}
              <div className="content">
                <Editor EditorChange={ (e)=> this.EditorChange(e) } editorValue={editorValue} />
              </div>
              {/* 表情包 */}
              <div className="emoji">
                <Tooltip 
                  className="tooltip"
                  placement="topLeft"
                  trigger="click" 
                  title={<Emoji emojiClose={this.emojiClose} selectEmoji={this.selectEmoji} />}
                  color="#fff"
                  visible={this.state.visible}
                >
                  <span onClick={this.emojiBtn} className="iconfont icon-xiaolian cursor" />
                </Tooltip>
              </div>
              
              {/* 上传图片 */}
              <div className="upload">
                <Upload
                  action={React.$api.DOMAIN + React.$api.API_MEMBER_UPLOAD}
                  headers={this.state.header}
                  name="files"
                  listType="picture-card"
                  fileList={this.state.fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {/* 显示图片数量 */}
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </div>
              <div className="formLine"></div>
              <p className="formIntroduce">支持JPG/GIF/PNG，RGB模式，单张图片不能超过10M</p>
              {/* 提交表单 */}
              <Button className="submit" type="primary" htmlType="submit">
                发表
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
  componentDidMount() {
    let { header } = this.state;
    if (localStorage.getItem('userInfo')) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      header['authorization'] = userInfo['token'];
      this.setState({
        header
      },function() {
        console.log(this.state)
      })
    };
  }
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  handleChange =({ fileList })=> {
    this.setState({ fileList });
  };
  // 车型分类
  selectChange =(e)=> {
    console.log(e);
  }
  // 获取富文本输入内容
  EditorChange =(e)=> {
    editorValue = e.toHTML();//富文本格式转换
  }
  // 打开表情包
  emojiBtn =()=> {
    this.setState({
      visible: true
    })
  }
  // 关闭表情包
  emojiClose =()=> {
    this.setState({
      visible: false
    })
  }
  // 选择表情包
  selectEmoji =(e)=> {
    editorValue += e;
  }
  
}