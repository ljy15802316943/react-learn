import React from 'react';
import './post.less'
import { message, Form, Input, Select, Tooltip, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Editor, Emoji } from '../../components';


const { Option } = Select;
let editorValue = '';//富文本内容

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,//控制 tooltip 显示隐藏。
      fileList: [],//获取上传图片
      pcMain: {},//获取本地缓存首页数据
      form: {//表单提交数据
        title: '',//标题
        cover: '',//图片
        content: '',//富文本内容
        forumId: '',//车型分类id
        photo: '',
        type: 0,
      },
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
          <Form className="form" onFinish={this.onFinish}>
            <Form.Item
              label="标题"
              name="标题"
              rules={[{required: true, message: 'Please input your username!',}]}
            >
              <Input onChange={this.titleInputChange} value={this.state.title} />
            </Form.Item>
            <Form.Item name="板块" label="板块" rules={[{ required: true }]}>
              <Select
                placeholder="请选择板块"
                onChange={this.selectChange}
                allowClear
              >
                {
                  this.state.pcMain.forum && this.state.pcMain.forum.map(v => <Option key={v.carId} value={v.id}>{v.title}</Option>)
                }
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
    let { header, pcMain } = this.state;
    // 获取缓存的用户信息
    if (localStorage.getItem('userInfo')) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      header['authorization'] = userInfo['token'];
    };
    // 获取缓存的首页数据
    if (localStorage.getItem('pcMain')) {
      pcMain = JSON.parse(localStorage.getItem('pcMain'));
    }
    this.setState({
      header,
      pcMain
    })
  }
  // 获取标题输入值
  titleInputChange =(e)=> {
    let { form } = this.state;
    form['title'] = e.target.value;
    this.setState({
      form
    })
  }
  // 获取车型分类id
  selectChange =(e)=> {
    let { form } = this.state;
    form['forumId'] = e;
    this.setState({
      form
    })
  }
  // 获取富文本输入内容
  EditorChange =(e)=> {
    editorValue = e.toHTML();//富文本格式转换
  }
  // 获取上传图片信息
  handleChange =({ fileList })=> {
    let { form } = this.state;
    if (fileList[0].response) {
      form.cover = fileList[0].response.files[0].url;
      this.setState({ 
        fileList,form 
      });
    }
  };
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
  // 提交表单
  onFinish =(e)=> {
    if (e) {//表单验证成功了
      let { form } = this.state;
      form.content = editorValue.trim();//获取富文本内容并去除两边空格
      if (!form.content) {
        message.warning('请输入内容');
        return
      };
      this.setState({ form });
      React.$axios.post(React.$api.HOME_HOME_SUBMIT, form).then((res) => {
        message.success(res.msg);
        if (res.returnCode === "200") {
          setTimeout(() => {
            this.props.history.push('/');
          }, 1000)
        }
      });
    } 
  }
}