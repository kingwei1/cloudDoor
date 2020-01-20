import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home'
import login from './components/Login'
import register from './components/register'
import Agreement from './components/Agreement'
import forgot from './components/forgot'
import verification from './components/verification'
import cloudHome from './components/cloudHome'
import ProjectList from './views/ProjectList'
import ProjectDetail1 from './views/ProjectDetail'
import informationList from './views/informationList'
import informationDetail from './views/informationDetail'
import backLogin from './components/backLogin'
import backNav from './components/backNav'
import serviceAgreement from './components/serviceAgreement'
import systemSetup from './views/system/systemSetup'
import editAuthority from './views/system/editAuthority'
import UserList from './views/user/UserList'
import viewAccount from './views/user/viewAccount'
import addAccount from './views/user/addAccount'
import Authentication from './views/user/Authentication'
import signAuthentication from './views/user/signAuthentication'
import viewAuthenticationDetail from './views/user/viewAuthenticationDetail'
import companyAccountList from './views/user/companyAccountList'
import reviewCompanyAccount from './views/user/reviewCompanyAccount'
import projectManage from './views/schoolAndCompanyProject/projectManage'
import reviewProjectList from './views/schoolAndCompanyProject/reviewProjectList'
import projectSortManage from './views/schoolAndCompanyProject/projectSortManage'
import addProject from './views/schoolAndCompanyProject/addProject'
import applyRecruits from './views/schoolAndCompanyProject/applyRecruits'
import bbs from './views/bbs/bbs'
import bbsDetail from './views/bbs/bbsDetail'
import bbsManage from './views/bbs/bbsManage'
import homeManage from './views/home/home'
import informationList2 from './views/home/informationList'
import informationManage from './views/home/informationManage'
import addInformation from './views/home/addInformation'
import enterpriseCooperation from './views/home/enterpriseCooperation'
import questionsList from './views/home/questionsList'
import addquestionsList from './views/home/addquestionsList'
import questionsClassification from './views/home/questionsClassification'
import opinionList from './views/home/opinionList'
import opinionClassification from './views/home/opinionClassification'
import contactManagement from './views/home/contactManagement'
import friendshipLink from './views/home/friendshipLink'
import APPRotation from './views/home/APPRotation'
import jobManage from './views/job/jobManage'
import projectDetail from './views/schoolAndCompanyProject/projectDetail'
import projectManageAudit from './views/user/projectManageAudit'
import personalInformation from './views/user/personalInformation'
import companyInformation from './views/user/companyInformation'
import schoolInformation from './views/user/schoolInformation'
import changePassword from './views/user/changePassword'
import manageInformation from './views/user/manageInformation'
import Thesidebar from './components/Thesidebar'
import Enterprise from './components/Enterprise'
import aboutUs from './components/aboutUs'
import Helpcenter from './components/Helpcenter'
import feedback from './components/feedback'
import contact from './components/contact'
import friendlyLink from './components/friendlyLink'
import detailedHelp from './components/detailedHelp'
import projectManageAudit1 from './views/schoolAndCompanyProject/projectManageAudit1'

Vue.use(Router)

export default new Router({
  model:'history',
  scrollBehavior(to,from,savePosition){
    if (savePosition) {
      return savePosition
    }else{
      return{x:0,y:0}
    }
  },
  routes: [
      {
          path: '/',
          redirect: home,
          query:{login:'2'}
      },
      {
          path: '/login',
          name: 'login',
          component: login
      },
      {
          path: '/serviceAgreement',
          name: 'serviceAgreement',
          component: serviceAgreement
      },
      {
          path: '/register',
          name: 'register',
          component: register
      },
      {
          path: '/Agreement',
          name: 'Agreement',
          component: Agreement
      },
      {
          path: '/forgot',
          name: 'forgot',
          component: forgot
      },
      {
          path: '/backLogin',
          name: 'backLogin',
          component: backLogin
      },
      {
          path: '/backNav',
          name: 'backNav',
          component: backNav,
          children:[
            {
              path: '/systemSetup',
              name: 'systemSetup',
              component: systemSetup,
            },
            {
              path: '/editAuthority',
              name: 'editAuthority',
              component: editAuthority,
            },
            {
              path: '/UserList',
              name: 'UserList',
              component: UserList,
            },
            {
              path: '/viewAccount',
              name: 'viewAccount',
              component: viewAccount,
            },
            {
              path: '/addAccount',
              name: 'addAccount',
              component: addAccount,
            },
            {
              path: '/Authentication',
              name: 'Authentication',
              component: Authentication,
            },
            {
              path: '/signAuthentication',
              name: 'signAuthentication',
              component: signAuthentication,
            },
            {
              path: '/viewAuthenticationDetail',
              name: 'viewAuthenticationDetail',
              component: viewAuthenticationDetail,
            },
            {
              path: '/companyAccountList',
              name: 'companyAccountList',
              component: companyAccountList,
            },
            {
              path: '/reviewCompanyAccount',
              name: 'reviewCompanyAccount',
              component: reviewCompanyAccount,
            },
            {
              path: '/projectManage',
              name: 'projectManage',
              component: projectManage,
            },
            {
              path: '/reviewProjectList',
              name: 'reviewProjectList',
              component: reviewProjectList,
            },
            {
              path: '/projectSortManage',
              name: 'projectSortManage',
              component: projectSortManage,
            },
            {
              path: '/addProject',
              name: 'addProject',
              component: addProject,
            },
          {
              path: '/projectDetail',
              name: 'projectDetail',
              component: projectDetail,
          },
            {
              path: '/applyRecruits',
              name: 'applyRecruits',
              component: applyRecruits,
            },
              {
                  path: '/bbs',
                  name: 'bbs',
                  component: bbs,
              },
              {
                  path: '/bbsDetail',
                  name: 'bbsDetail',
                  component: bbsDetail,
              },{
                  path: '/bbsManage',
                  name: 'bbsManage',
                  component: bbsManage,
              },{
                  path: '/homeManage',
                  name: 'homeManage',
                  component: homeManage,
              },
              {
                  path: '/informationList2',
                  name: 'informationList2',
                  component: informationList2,
              },
              {
                  path: '/informationManage',
                  name: 'informationManage',
                  component: informationManage,
              },
              {
                  path: '/addInformation',
                  name: 'addInformation',
                  component: addInformation,
              },
              {
                  path: '/enterpriseCooperation',
                  name: 'enterpriseCooperation',
                  component: enterpriseCooperation,
              },
              {
                  path: '/questionsList',
                  name: 'questionsList',
                  component: questionsList,
              },
              {
                  path: '/addquestionsList',
                  name: 'addquestionsList',
                  component: addquestionsList,
              },
              {
                  path: '/questionsClassification',
                  name: 'questionsClassification',
                  component: questionsClassification,
              },
              {
                  path: '/opinionList',
                  name: 'opinionList',
                  component: opinionList,
              },
              {
                  path: '/opinionClassification',
                  name: 'opinionClassification',
                  component: opinionClassification,
              },
              {
                  path: '/contactManagement',
                  name: 'contactManagement',
                  component: contactManagement,
              },
              {
                  path: '/friendshipLink',
                  name: 'friendshipLink',
                  component: friendshipLink,
              },
              {
                path: '/APPRotation',
                name: 'APPRotation',
                component: APPRotation,
              },
              {
                  path: '/jobManage',
                  name: 'jobManage',
                  component: jobManage,
              },
							{
								path: '/projectManageAudit',
								name: 'projectManageAudit',
								component: projectManageAudit,
							},
              {
              	path: '/personalInformation',
              	name: 'personalInformation',
              	component: personalInformation,
              },
							{
								path: '/companyInformation',
								name: 'companyInformation',
								component: companyInformation,
							},
							{
								path: '/schoolInformation',
								name: 'schoolInformation',
								component: schoolInformation,
							},
							{
								path: '/changePassword',
								name: 'changePassword',
								component: changePassword,
							},
							{
								path: '/manageInformation',
								name: 'manageInformation',
								component: manageInformation,
							},
							{
								path: '/projectManageAudit1',
								name: 'projectManageAudit1',
								component: projectManageAudit1,
							},
          ]
      },
      {
          path: '/home',
          name: 'home',
          component: home,
          redirect:'/cloudHome',
          children: [
            {
              path: '/verification',
              name: 'verification',
              component: verification
            },
						{
							path:'/cloudHome',
							component:cloudHome,
						},
						{
							path: '/ProjectList',
							name: 'ProjectList',
							component: ProjectList
							},{
									path: '/ProjectDetail1',
									name: 'ProjectDetail1',
									component: ProjectDetail1
							},{
									path: '/informationList',
									name: 'informationList',
									component: informationList
							},{
									path: '/informationDetail',
									name: 'informationDetail',
									component: informationDetail
							},
							{
							path:'/detailedHelp',
							component:detailedHelp
						},
						{
							path:'/Thesidebar',
							component:Thesidebar,
							children:[
							{
								path:'/Enterprise',
							component:Enterprise
							},
							{
								path:'/aboutUs',
							component:aboutUs
							},
							{
								path:'/Helpcenter',
							component:Helpcenter
							},
							{
								path:'/feedback',
							component:feedback
							},
							{
								path:'/contact',
							component:contact
							},
							{
								path:'/friendlyLink',
							component:friendlyLink
							},
							]
						},
//          {
//            path: '/cloudHome',
//            name: 'cloudHome',
//            component: cloudHome
//          },

        ]
    }
  ]
})
