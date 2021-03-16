(this["webpackJsonpknow-its-off"]=this["webpackJsonpknow-its-off"]||[]).push([[0],{107:function(e,t,a){"use strict";a.r(t);var s,n,i=a(1),r=a.n(i),c=a(30),o=a.n(c),l=(a(78),a(5)),d=a(6),h=a(8),m=a(7),j=a(15),p=a(11),b=a(12),u=(a(79),a(9)),v=a(40),g=a.n(v),x=g.a.create({baseURL:"http://know-its-off.com/api/"}),f=a(66),O=a.n(f),y=a(0),N=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).state={battery:[{device_battery:100,timestamp_time:""}],error:!1,loading:!0},s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this,t="/batteryLogs/"+this.props.match.params.handle;x.get(t).then((function(t){e.setState({battery:t.data}),e.setState({loading:!1})}))}},{key:"render",value:function(){return this.state.loading?Object(y.jsx)("div",{className:"d-flex justify-content-center m-5",children:Object(y.jsx)(u.CircleSpinner,{size:60,color:"#686769",loading:this.state.loading})}):this.state.error?this.state.redirect?Object(y.jsx)(p.a,{to:this.state.redirect}):Object(y.jsxs)("div",{children:[Object(y.jsx)("h3",{children:"There was an error"}),Object(y.jsx)("h3",{children:this.state.error_response})]}):Object(y.jsxs)(r.a.Fragment,{children:[this.state.battery.map((function(e){return Object(y.jsx)("div",{className:"col mt-3 text-light",children:Object(y.jsx)("div",{className:"card bg-dark",children:Object(y.jsxs)("div",{className:"card-body",children:[Object(y.jsxs)("p",{className:"card-text",children:["Battery: ",e.device_battery,"%"]}),Object(y.jsxs)("p",{className:"card-text",children:["Last Seen: ",e.timestamp_time]})]})})})})),Object(y.jsx)(O.a,{style:{display:"flex",margin:"1em"},className:"btn btn-info float-right footer affix",data:this.state.battery,children:"Download CSV"})]})}}]),a}(i.Component),D=a(38),S=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).toggleNavbar=s.toggleNavbar.bind(Object(D.a)(s)),s.state={collapsed:!0},s}return Object(d.a)(a,[{key:"toggleNavbar",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){var e=this.state.collapsed,t=e?"collapse navbar-collapse justify-content-between":"collapse nav-bar collapse show justify-content-between",a=e?"navbar-toggler navbar-toggler-right collapsed":"navbar-toggler navbar-toggler-right";return Object(y.jsxs)("nav",{className:"navbar bg-primary navbar-expand-lg navbar-dark",children:[Object(y.jsx)(b.b,{to:"/home",className:"navbar-brand",children:"Know It's Off"}),Object(y.jsx)("button",{onClick:this.toggleNavbar,className:"".concat(a),type:"button","data-toggle":"collapse","data-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(y.jsx)("span",{className:"navbar-toggler-icon"})}),Object(y.jsxs)("div",{className:"".concat(t),id:"navbarNavAltMarkup",children:[Object(y.jsxs)("div",{className:"navbar-nav",children:[Object(y.jsx)(b.b,{to:"/device/new",className:"nav-item nav-link text-light",children:"New Device"}),Object(y.jsx)(b.b,{to:"/user/edit",className:"nav-item nav-link text-light",children:"Edit User"})]}),Object(y.jsx)("div",{className:"navbar-nav",children:Object(y.jsx)(b.b,{to:"/logout",className:"nav-item nav-link text-light",children:"Logout"})})]})]})}}]),a}(i.Component),C=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return Object(y.jsx)("div",{children:Object(y.jsx)("h3",{children:"404 Error: Page not found, this is a served error"})})}}]),a}(i.Component),w=a(18),_=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).doLogin=function(e){s.setState({postLoading:!0}),x.post("/login",{email:s.state.email,password:s.state.password,remember:s.state.remember}).then((function(e){s.setState({postLoading:!1,flag:!1}),s.props.history.push("/home")})).catch((function(e){s.setState({postLoading:!1,flag:!0})})),e.preventDefault()},s.handleChange=function(e){s.setState(Object(w.a)({},e.target.name,e.target.value))},s.toggleCheckbox=function(){s.setState((function(e){return{remember:!e.remember}}))},s.state={loading:!1,email:"",password:"",error:!1,flag:!1,postLoading:!1,OAuthLoading:!1,remember:!0,auth_url:""},s}return Object(d.a)(a,[{key:"render",value:function(){if(this.state.error)return Object(y.jsx)("div",{classNameName:"m-5",children:Object(y.jsx)("h3",{children:"There was an error"})});if(this.state.loading)return Object(y.jsx)("div",{classNameName:"d-flex justify-content-center m-5",children:Object(y.jsx)(u.CircleSpinner,{size:60,color:"#686769",loading:this.state.loading})});var e=this.state.flag;return Object(y.jsxs)("div",{className:"mt-5 mb-5 container bg-dark border",children:[Object(y.jsx)("div",{className:"row justify-content-md-center text-light mt-5",children:Object(y.jsx)("h1",{children:"Log In to Know It's Off"})}),Object(y.jsx)("div",{className:"row justify-content-md-center text-light mb-5",children:Object(y.jsxs)("form",{children:[Object(y.jsxs)("div",{className:"form-group",children:[e&&Object(y.jsx)("div",{color:"red",children:"Email or password incorrect"}),Object(y.jsx)("label",{children:"Email address"}),Object(y.jsx)("input",{name:"email",type:"email",className:"form-control",value:this.state.email,onChange:this.handleChange,id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Enter email"})]}),Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Password"}),Object(y.jsx)("input",{name:"password",type:"password",onChange:this.handleChange,value:this.state.password,className:"form-control",id:"exampleInputPassword1",placeholder:"Password"})]}),Object(y.jsxs)("div",{className:"form-check",children:[Object(y.jsx)("input",{className:"form-check-input",type:"checkbox",checked:this.state.remember,onChange:this.toggleCheckbox,id:"checkbox"}),Object(y.jsx)("label",{className:"form-check-label",for:"checkbox",children:"Remember Me"})]}),Object(y.jsxs)("button",{onClick:this.doLogin,className:"btn btn-primary",children:["Submit",Object(y.jsx)(u.CircleSpinner,{size:20,color:"#3BBCE5",loading:this.state.postLoading})]}),Object(y.jsx)(b.b,{id:"signupHelp",to:"/signup",className:"form-text text-muted",children:"Register New User"})]})})]})}}]),a}(i.Component),k=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).doSignup=function(e){s.setState({postLoading:!0}),x.post("/user",{email:s.state.email,password:s.state.password}).then((function(e){s.setState({postLoading:!1}),s.props.history.push("/login")})).catch((function(e){s.setState({postLoading:!1}),alert("Invalid username and password"),console.log(e)})),e.preventDefault()},s.handleChange=function(e){s.setState(Object(w.a)({},e.target.name,e.target.value))},s.state={loading:!1,email:"",password:"",error:!1,postLoading:!1},s}return Object(d.a)(a,[{key:"render",value:function(){return this.state.error?Object(y.jsx)("div",{classNameName:"m-5",children:Object(y.jsx)("h3",{children:"There was an error"})}):this.state.loading?Object(y.jsx)("div",{classNameName:"d-flex justify-content-center m-5",children:Object(y.jsx)(u.CircleSpinner,{size:60,color:"#686769",loading:this.state.loading})}):Object(y.jsxs)("div",{className:"mt-5 mb-5 container bg-dark border",children:[Object(y.jsx)("div",{className:"row justify-content-md-center mt-5",children:Object(y.jsx)("h1",{children:"Sign up to Know It's Off"})}),Object(y.jsx)("div",{className:"row justify-content-md-center mb-5",children:Object(y.jsxs)("form",{children:[Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Email address"}),Object(y.jsx)("input",{name:"email",type:"email",className:"form-control",value:this.state.email,onChange:this.handleChange,id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Enter email"}),Object(y.jsx)("small",{id:"emailHelp",className:"form-text text-muted",children:"We'll never share your email with anyone else."})]}),Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Password"}),Object(y.jsx)("input",{name:"password",type:"password",onChange:this.handleChange,value:this.state.password,className:"form-control",id:"exampleInputPassword1",placeholder:"Password"})]}),Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Confirm Password"}),Object(y.jsx)("input",{name:"passwordConf",type:"password",onChange:this.handleChange,value:this.state.passwordConf,className:"form-control",id:"exampleInputPassword2",placeholder:"Password"})]}),Object(y.jsxs)("button",{onClick:this.doSignup,className:"btn btn-primary",children:["Submit",Object(y.jsx)(u.CircleSpinner,{size:20,color:"#3BBCE5",loading:this.state.postLoading})]})]})})]})}}]),a}(i.Component),L=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).state={error:!1,redirect:"/"},s}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return this.state.error?Object(y.jsx)("div",{classNameName:"m-5",children:Object(y.jsx)("h3",{children:"There was an error"})}):(x.get("/logout").then((function(){})).catch((function(){return Object(y.jsx)(p.a,{to:e.state.invalid})})),Object(y.jsx)(p.a,{to:this.state.invalid}))}}]),a}(i.Component),I=a(52),P=a(114),z=a(115),E=Object(i.memo)((function(e){var t=e.id,a=e.onMoveItem,s=e.children,n=Object(i.useRef)(null),c=Object(P.a)({item:{id:t,type:"IMG"},collect:function(e){return{isDragging:e.isDragging()}}}),o=Object(I.a)(c,2),l=o[0].isDragging,d=o[1],h=Object(z.a)({accept:"IMG",hover:function(e){e.id!==t&&a(e.id,t)}}),m=Object(I.a)(h,2)[1];d(n),m(n);var j={opacity:l?.5:1};return r.a.Children.map(s,(function(e){return r.a.cloneElement(e,{forwardedRef:n,style:j})}))})),B=a(72),T=a(50),M=a(39),A=M.default.div(s||(s=Object(T.a)(["\n  width: 100%;\n  padding: 0px 10px 0px 10px;\n  display: flex;\n  justify-content: start;\n  flex-wrap: wrap;\n"]))),U=M.default.div(n||(n=Object(T.a)(['\n  flex: 0 0 25%;\n  flex-grow: 0.75;\n  min-width: 250px;\n  max-width: 500px;\n  max-height: 270px;\n  display: flex;\n  justify-content: center;\n  align-items: stretch;\n  box-sizing: border-box;\n  :before {\n    content: "";\n    display: table;\n    padding-top: 100%;\n  }\n']))),H=function(e){var t=e.forwardedRef,a=Object(B.a)(e,["forwardedRef"]);return Object(y.jsx)(U,Object(j.a)({ref:t},a))},R=a(44),F=a.n(R);function G(e,t,a){return function(e,t,a){return a>=e.length&&(a=e.length-1),e.splice(a,0,e.splice(t,1)[0]),e}(e,t,t+a)}var K=Object(i.createContext)({items:[]}),V=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).setItems=function(e){if(!F.a.get("idList")&&e)s.setState({items:e});else{var t,a,n=e.slice(),i=JSON.parse(F.a.get("idList")),r=[];for(t in i)for(a in n){n[a].id===i[t]&&(r.push(n[a]),n.splice(a,1))}}for(t in n)r.push(n[t]);r&&s.setState({items:r})},s.moveItem=function(e,t){var a=s.state.items.findIndex((function(t){return t.id===e})),n=s.state.items.findIndex((function(e){return e.id===t}));if(-1!==e&&-1!==t){var i,r=n-a;s.setState((function(e){return{items:G(e.items,a,r)}}));var c=[];for(i in s.state.items)c.push(s.state.items[i].id);F.a.set("idList",c)}},s.state={items:[],moveItem:s.moveItem,setItems:s.setItems},s}return Object(d.a)(a,[{key:"render",value:function(){return Object(y.jsx)(K.Provider,{value:this.state,children:this.props.children})}}]),a}(i.Component),J=K,Z=a(28),W=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(l.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).state={device_id:e.props.device_id,appliance_name:e.props.appliance_name,device_state:e.props.state,timestamp:e.props.timestamp,statusText:"OFF",background:"light",loading:!0},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){1===this.props.state?this.setState({background:"success",statusText:"ON"}):2===this.props.state?this.setState({background:"warning",statusText:"UNINITIALIZED"}):0===this.props.state&&this.setState({background:"danger"}),this.setState({loading:!1})}},{key:"render",value:function(){return this.state.loading?Object(y.jsx)("div",{className:"d-flex justify-content-center m-5",children:Object(y.jsx)(u.CircleSpinner,{size:60,color:"#686769",loading:this.state.loading})}):Object(y.jsxs)(Z.a,{bg:this.state.background,className:"tile text-center col ",children:[Object(y.jsx)(Z.a.Header,{children:Object(y.jsx)(Z.a.Title,{className:"card-title-device",children:this.state.appliance_name})}),Object(y.jsxs)(Z.a.Body,{children:[Object(y.jsx)(Z.a.Title,{className:"card-title-status",children:this.state.statusText}),Object(y.jsx)(Z.a.Text,{className:"card-text-device_state",children:this.state.state}),Object(y.jsxs)(Z.a.Text,{className:"card-text-timestamp",children:["Last Seen: ",this.state.timestamp]}),Object(y.jsx)(b.b,{className:"card-button btn btn-primary text-wrap",to:"/device/"+this.state.device_id,children:"Details"})]})]})}}]),a}(i.Component);var q=function(e){var t=Object(i.useContext)(J),a=t.items,s=t.moveItem;return Object(y.jsx)("div",{className:"GridApp",children:Object(y.jsx)(A,{children:a.map((function(e){return Object(y.jsx)(E,{id:e.id,onMoveItem:s,children:Object(y.jsx)(H,{children:Object(y.jsx)(W,{device_id:e.id,device_battery:e.device_battery,appliance_name:e.appliance_name,state:e.device_state,timestamp:e.timestamp},e.id)})},e.id)}))})})},Q=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).count_dev_state=function(e){for(var t=0,a=0;e.length>a;a++)1===e[a].device_state&&t++;return t},s.state={loading:!0,error:!1,redirect:null},s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;x.get("/devices").then((function(t){e.setState({num_on:e.count_dev_state(t.data)}),e.context.setItems(t.data),e.setState({loading:!1})})).catch((function(t){e.setState({loading:!1,error:!0}),console.log("error at get device: ",t.response)}))}},{key:"render",value:function(){return this.state.loading?Object(y.jsx)("div",{className:"d-flex justify-content-center m-5",children:Object(y.jsx)(u.CircleSpinner,{size:60,color:"#686769",loading:this.state.loading})}):this.state.error?this.state.redirect?Object(y.jsx)(p.a,{to:this.state.redirect}):Object(y.jsxs)("div",{children:[Object(y.jsx)("h3",{children:"There was an error"}),Object(y.jsx)("h3",{children:this.state.error_response})]}):Object(y.jsxs)("div",{children:[Object(y.jsx)("div",{className:"row m-3 text-light",children:Object(y.jsx)("div",{className:"col",children:Object(y.jsx)("h1",{className:"text-center",children:"Home"})})}),Object(y.jsx)("div",{className:"row m-3 text-light",children:Object(y.jsx)("div",{className:"col",children:Object(y.jsxs)("h6",{className:"text-muted text-center",children:[this.state.num_on," of your appliances are on."]})})}),Object(y.jsx)(q,{})]})}}]),a}(i.Component);Q.contextType=J;var X,Y=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).verify=function(e){s.setState({verifyLoad:!0}),x.post("/login",{email:s.state.current.email,password:s.state.current.password,remember:s.state.remember}).then((function(e){s.setState({verifyLoad:!1,detail_form:!0,flag:!1})})).catch((function(e){s.setState({verifyLoad:!1,flag:!0,error_response:e.response.status}),"not authorized"===e.response.data?s.setState({redirect:"/"}):e.response.data&&console.log(e.response.data)})),e.preventDefault()},s.delete=function(e){s.setState({deleteLoad:!0}),!0===window.confirm("Are you sure?")?x.post("/login",{email:s.state.current.email,password:s.state.current.password}).then((function(e){x.delete("/user/current"),s.setState({deleteLoad:!1,redirect:"/"})})).catch((function(e){s.setState({deleteLoad:!1,flag:!0,error_response:e.response.status}),"not authorized"===e.response.data?s.setState({redirect:"/"}):e.response.data&&console.log(e.response.data)})):s.setState({loading:!1})},s.handleChange=function(e){s.setState({current:Object(j.a)(Object(j.a)({},s.state.current),{},Object(w.a)({},e.target.name,e.target.value))})},s.handlePassChange=function(e){s.setState(Object(w.a)({},e.target.name,e.target.value))},s.update=function(e){s.setState({changeLoad:!0}),void 0===s.state.current.email||void 0===s.state.current.username?(alert("Fill out Username field."),s.setState({changeLoad:!1}),e.preventDefault()):s.state.confirmPass!==s.state.currentPass?(alert("Passwords do not match."),s.setState({changeLoad:!1}),e.preventDefault()):(x.post("/login",{email:s.state.current.email,password:s.state.current.password,remember:!0}).then((function(e){x.patch("/user/current",{email:s.state.current.email,password:s.state.confirmPass,username:s.state.current.username}).then((function(e){s.setState({changeLoad:!1}),alert("User Information Successfully Updated!")})).catch((function(e){s.setState({changeLoad:!1,error:!0,error_response:e.response.data}),"not authorized"===e.response.data?s.setState({redirect:"/"}):e.response.data&&console.log(e.response.data)}))})).catch((function(e){s.setState({changeLoad:!1,error:!0,error_response:e.response.data}),"not authorized"===e.response.data?s.setState({redirect:"/"}):e.response.data&&console.log(e.response.data)})),e.preventDefault())},s.state={current:{username:"",email:"",password:""},currentPass:"",confirmPass:"",detail_form:!1,flag:!1,loading:!0,verifyLoad:!1,deleteLoad:!1,changeLoad:!1,error:!1,redirect:null,remember:!0},s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;!1===this.state.detail_form&&x.get("/user/current").then((function(t){e.setState({loading:!1,current:{username:t.data.username,email:t.data.email}})})).catch((function(t){e.setState({loading:!1,error:!0}),t.response&&(e.setState({error_response:t.response.status}),"not authorized"===t.response.data?e.setState({redirect:"/"}):t.response.data&&console.log(t.response.data))}))}},{key:"render",value:function(){if(this.state.error)return Object(y.jsx)("div",{className:"m-5",children:Object(y.jsx)("h3",{children:"Error: Not Logged In"})});if(this.state.loading)return Object(y.jsx)("div",{className:"d-flex justify-content-center m-5",children:Object(y.jsx)(u.CircleSpinner,{size:60,color:"#686769",loading:this.state.loading})});var e=this.state,t=e.detail_form,a=e.flag;return Object(y.jsxs)("div",{className:"m-5 text-light",children:[a&&Object(y.jsx)("div",{color:"red",children:"Email or password incorrect"}),Object(y.jsx)("h3",{children:"Enter User Details:"}),Object(y.jsxs)("form",{children:[Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Email"}),Object(y.jsx)("input",{className:"form-control text-dark",name:"email",id:"inputEmail",type:"email",onChange:this.handleChange,value:this.state.current.email})]}),Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Password"}),Object(y.jsx)("input",{className:"form-control text-dark",name:"password",id:"inputPassword",type:"password",onChange:this.handleChange,value:this.state.current.password})]}),Object(y.jsxs)("button",{onClick:this.verify,className:"btn btn-success btn-space",children:["Verify and Change User Details",Object(y.jsx)(u.CircleSpinner,{size:10,color:"#3BBCE5",loading:this.state.verifyLoad})]}),Object(y.jsxs)("button",{onClick:this.delete,className:"btn btn-danger btn-space",children:["Delete User",Object(y.jsx)(u.CircleSpinner,{size:10,color:"#3BBCE5",loading:this.state.deleteLoad})]})]}),t&&Object(y.jsxs)("form",{children:[Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Change Username"}),Object(y.jsx)("input",{className:"form-control text-dark",name:"username",id:"inputUsername",type:"username",onChange:this.handleChange,value:this.state.current.username,placeholder:this.state.current.username})]}),Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Change Email"}),Object(y.jsx)("input",{className:"form-control text-dark",name:"email",id:"inputEmail",type:"email",onChange:this.handleChange,value:this.state.current.email,placeholder:this.state.current.email})]}),Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Change Password"}),Object(y.jsx)("input",{className:"form-control text-dark",name:"currentPass",id:"inputCurrentPass",type:"password",onChange:this.handlePassChange,value:this.state.currentPass,placeholder:this.state.currentPass})]}),Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Confirm Password"}),Object(y.jsx)("input",{className:"form-control text-dark",name:"confirmPass",id:"inputConfirmPass",type:"password",onChange:this.handlePassChange,value:this.state.confirmPass,placeholder:this.state.confirmPass})]}),Object(y.jsxs)("button",{onClick:this.update,className:"btn btn-success btn-space",children:["Update Information",Object(y.jsx)(u.CircleSpinner,{size:10,color:"#3BBCE5",loading:this.state.changeLoad})]})]})]})}}]),a}(i.Component),$=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).postData=function(e){s.setState({postLoading:!0}),x.get("/allDevices").then((function(e){s.setState({allDevices:e.data})}));for(var t=!0,a=0;a<s.state.allDevices.length;a++)s.state.myDevice.id===s.state.allDevices[a].id&&(t=!1);(t||"0"===s.state.myDevice.id)&&(console.log(s.state.myDevice),x.post("/device",s.state.myDevice).then((function(e){s.setState({myDevice:Object(j.a)(Object(j.a)({},s.state.myDevice),{},{id:e.data.id}),postLoading:!1,revealDetails:!0}),alert("Device Creation Successful!"),s.props.history.push("/home")})).catch((function(e){s.setState({loading:!1}),alert("Please enter a valid Device ID!")}))),e.preventDefault()},s.handleChangeDevice=function(e){s.setState({myDevice:Object(j.a)(Object(j.a)({},s.state.myDevice),{},Object(w.a)({},e.target.name,e.target.value))})},s.state={myDevice:{id:"0",appliance_name:"My Appliance",device_state:0,device_battery:100},userDevices:[],applianceNames:[],allDevices:[],disabled:!1,loading:!0,error:!1,postLoading:!1,redirect:null,revealDetails:!1},s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;x.get("/devices").then((function(t){e.setState({loading:!1,usersDevices:t.data});var a,s=[];for(a in e.state.usersDevices)s.push([e.state.usersDevices[a].appliance_name,e.state.usersDevices[a].id,e.state.usersDevices[a].device_battery,e.state.usersDevices[a].device_state]);e.setState({applianceNames:s})})).catch((function(t){e.setState({loading:!1,error:!0}),t.response&&(e.setState({error_response:t.response.data}),"not authorized"===t.response.data?e.setState({redirect:"/"}):t.response.data&&console.log(t.response.data))}))}},{key:"render",value:function(){if(this.state.error)return Object(y.jsx)("div",{className:"m-5",children:Object(y.jsx)("h3",{children:"There was an error"})});if(this.state.loading)return Object(y.jsx)("div",{className:"d-flex justify-content-center m-5",children:Object(y.jsx)(u.CircleSpinner,{size:60,color:"#686769",loading:this.state.loading})});var e=this.state.revealDetails;return Object(y.jsxs)("div",{className:"m-5 text-light",children:[Object(y.jsx)("h3",{children:"New Device"}),Object(y.jsxs)("form",{children:[Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Appliance Name"}),Object(y.jsx)("input",{className:"form-control text-dark",name:"appliance_name",id:"inputApplianceName","aria-describedby":"nameHelp",onChange:this.handleChangeDevice,value:this.state.myDevice.appliance_name}),Object(y.jsx)("label",{children:"Device ID"}),Object(y.jsx)("input",{className:"form-control text-dark",name:"id",id:"inputId","aria-describedby":"nameHelp",onChange:this.handleChangeDevice,value:this.state.myDevice.id})]}),Object(y.jsxs)("button",{onClick:this.postData,className:"btn btn-success",children:["Add this device",Object(y.jsx)(u.CircleSpinner,{size:20,color:"#3BBCE5",loading:this.state.postLoading})]})]}),e&&Object(y.jsx)(W,{device_id:this.state.myDevice.id,device_battery:this.state.myDevice.device_battery,appliance_name:this.state.myDevice.appliance_name,state:this.state.myDevice.device_state,timestamp:this.state.myDevice.timestamp},this.state.myDevice.id)]})}}]),a}(i.Component),ee=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).updateDevice=function(e){s.setState({loading:!0}),x.get("/allDevices").then((function(e){s.setState({allDevices:e.data})}));for(var t=!0,a=0;a<s.state.allDevices.length;a++)s.state.myDevice.id===s.state.allDevices[a].id&&(t=!1);t?x.patch(X,s.state.myDevice).then((function(e){s.setState({loading:!1}),alert("Device Updated Successfully!"),s.props.history.push("/home")})).catch((function(e){s.setState({loading:!1}),alert("Please enter a valid Device ID!")})):(s.setState({loading:!1}),alert("Please enter a valid Device ID!")),e.preventDefault()},s.handleChangeDevice=function(e){s.setState({myDevice:Object(j.a)(Object(j.a)({},s.state.myDevice),{},Object(w.a)({},e.target.name,e.target.value))})},s.state={myDevice:{appliance_name:"My Appliance",device_state:1,device_battery:100,id:1},allDevices:[],loading:!0,error:!1},s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.handle;X="/device/"+t,x.get(X).then((function(t){e.setState({myDevice:{id:t.data.id,appliance_name:t.data.appliance_name,device_state:t.data.device_state,device_battery:t.data.device_battery},loading:!1})})).catch((function(t){e.setState({loading:!1,error:!0}),t.response&&(e.setState({error_response:t.response.data}),"not authorized"===t.response.data?e.setState({redirect:X}):t.response.data&&console.log(t.response))}))}},{key:"render",value:function(){return this.state.error?this.state.redirect?Object(y.jsx)(p.a,{to:this.state.redirect}):Object(y.jsx)("div",{className:"m-5",children:Object(y.jsx)("h3",{children:"There was an error"})}):this.state.loading?Object(y.jsx)("div",{className:"d-flex justify-content-center m-5",children:Object(y.jsx)(u.CircleSpinner,{size:60,color:"#686769",loading:this.state.loading})}):Object(y.jsxs)("div",{className:"m-5 text-light",children:[Object(y.jsx)("h3",{children:"Edit Device"}),Object(y.jsxs)("form",{children:[Object(y.jsxs)("div",{className:"form-group",children:[Object(y.jsx)("label",{children:"Appliance Name"}),Object(y.jsx)("input",{className:"form-control text-dark",name:"appliance_name",id:"inputApplianceName","aria-describedby":"nameHelp",onChange:this.handleChangeDevice,value:this.state.myDevice.appliance_name}),Object(y.jsx)("label",{children:"Device ID"}),Object(y.jsx)("input",{className:"form-control text-dark",name:"id",id:"inputDeviceId","aria-describedby":"nameHelp",onChange:this.handleChangeDevice,value:this.state.myDevice.id})]}),Object(y.jsxs)("button",{onClick:this.updateDevice,className:"btn btn-success",children:["Update",Object(y.jsx)(u.CircleSpinner,{size:20,color:"#3BBCE5",loading:this.state.loading})]})]})]})}}]),a}(i.Component),te=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).deleteDevice=function(e){if(!0===window.confirm("Do you really want to delete this, it will be permanent!")){var t="/device/"+s.props.match.params.handle;x.delete(t).then((function(e){s.setState({redirect:"/home",loading:!1}),alert("Device Removed Successfully!"),s.props.history.push("/home")})).catch((function(e){s.setState({error:!0}),e.response&&(console.log(e.response),s.setState({error_response:e.response.data}))})),e.preventDefault()}},s.state={myDevice:{appliance_name:"",device_state:1,device_battery:100,timestamp:"",id:1},error:!1,loading:!0},s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this,t="/device/"+this.props.match.params.handle;x.get(t).then((function(t){e.setState({myDevice:{id:t.data.id,appliance_name:t.data.appliance_name,device_state:t.data.device_state,device_battery:t.data.device_battery,timestamp:t.data.timestamp}}),e.setState({loading:!1})})).catch((function(t){e.setState({error:!0,loading:!1}),"not authorized"===t.response.data?e.setState({redirect:"/home"}):t.response.data&&console.log(t.response)}))}},{key:"render",value:function(){return this.state.loading?Object(y.jsx)("div",{className:"d-flex justify-content-center m-5",children:Object(y.jsx)(u.CircleSpinner,{size:60,color:"#686769",loading:this.state.loading})}):this.state.error?this.state.redirect?Object(y.jsx)(p.a,{to:this.state.redirect}):Object(y.jsxs)("div",{children:[Object(y.jsx)("h3",{children:"There was an error"}),Object(y.jsx)("h3",{children:this.state.error_response})]}):Object(y.jsx)("div",{className:"col mt-3 text-light",children:Object(y.jsx)("div",{className:"card bg-dark",children:Object(y.jsxs)("div",{className:"card-body",children:[Object(y.jsxs)("button",{onClick:this.deleteDevice,className:"btn btn-sm btn-danger float-right","data-toggle":"tooltip","data-placement":"bottom",title:"Delete Device",children:["\u2716",Object(y.jsx)(u.CircleSpinner,{size:20,color:"#3BBCE5",loading:this.state.loading})]}),Object(y.jsx)("h5",{className:"card-title text-wrap",children:this.state.myDevice.appliance_name}),Object(y.jsxs)("p",{className:"card-title text-wrap",children:["Device id: ",this.state.myDevice.id]}),Object(y.jsxs)("p",{className:"card-text",children:["State: ",this.state.myDevice.device_state?"ON":"OFF"]}),Object(y.jsxs)("p",{className:"card-text",children:["Battery: ",this.state.myDevice.device_battery,"%"]}),Object(y.jsxs)("p",{className:"card-text",children:["Last Seen: ",this.state.myDevice.timestamp]}),Object(y.jsx)(b.b,{to:"/device/"+this.state.myDevice.id+"/edit",className:"btn btn-primary text-wrap","data-toggle":"tooltip","data-placement":"bottom",title:"Change Device Details",children:"Modify"}),Object(y.jsx)(b.b,{to:"/device/"+this.state.myDevice.id+"/logs",className:"btn btn-success text-wrap float-right",children:"Battery Logs"})]})})})}}]),a}(i.Component),ae=a(51),se=(a(108),a(113));ae.a.initializeApp({apiKey:"AIzaSyCGG2bVOzc9jR_dPhNlTxEn_ZTajkcHVzo",authDomain:"know-its-off-jsyg.firebaseapp.com",projectId:"know-its-off-jsyg",storageBucket:"know-its-off-jsyg.appspot.com",messagingSenderId:"1039398438265",appId:"1:1039398438265:web:f0e1ae04a1db6c68025ba8"});var ne=ae.a.messaging(),ie=(i.Component,a(106),function(e){var t=e.exact,a=e.path,s=e.component;return Object(y.jsx)(p.b,{exact:t,path:a,render:function(e){return Object(y.jsxs)("div",{children:[Object(y.jsx)(S,{}),Object(y.jsx)(s,Object(j.a)({},e))]})}})}),re=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return Object(y.jsx)(r.a.Fragment,{children:Object(y.jsx)(b.a,{children:Object(y.jsxs)(p.d,{children:[Object(y.jsx)(p.b,{exact:!0,path:"/",component:_}),Object(y.jsx)(p.b,{exact:!0,path:"/login",component:_}),Object(y.jsx)(p.b,{exact:!0,path:"/logout",component:L}),Object(y.jsx)(p.b,{exact:!0,path:"/signup",component:k}),Object(y.jsx)(ie,{exact:!0,path:"/home",component:Q}),Object(y.jsx)(ie,{exact:!0,path:"/device/new",component:$}),Object(y.jsx)(ie,{exact:!0,path:"/device/:handle",component:te}),Object(y.jsx)(ie,{exact:!0,path:"/device/:handle/logs",component:N}),Object(y.jsx)(ie,{exact:!0,path:"/device/:handle/edit",component:ee}),Object(y.jsx)(ie,{exact:!0,path:"/user/edit",component:Y}),Object(y.jsx)(ie,{component:C})]})})})}}]),a}(i.Component),ce=a(112),oe=a(71);o.a.render(Object(y.jsx)(ce.a,{backend:oe.a,options:{enableMouseEvents:!0},children:Object(y.jsx)(V,{children:Object(y.jsx)(re,{})})}),document.getElementById("app"))},78:function(e,t,a){},79:function(e,t,a){}},[[107,1,2]]]);
//# sourceMappingURL=main.8fc64c19.chunk.js.map