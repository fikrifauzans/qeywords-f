import { lazy } from 'react';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';

import './helpers/functions/Interceptors';

const Index = Loadable(lazy(() => import('app/views/base/baseCrud/Index')));
const Form = Loadable(lazy(() => import('app/views/base/baseCrud/Form')));
const Detail = Loadable(lazy(() => import('app/views/base/baseCrud/Detail')));

const Artikel = Loadable(lazy(() => import('app/views/website/artikel/Index')));
const ArtikelForm = Loadable(lazy(() => import('app/views/website/artikel/Form')));
const ArtikelDetail = Loadable(lazy(() => import('app/views/website/artikel/Detail')));

const IndexWebsiteSliderEvent = Loadable(lazy(() => import('app/views/website/sliderEvent/Index')));
const FormWebsiteSliderEvent = Loadable(lazy(() => import('app/views/website/sliderEvent/Form')));
const DetailWebsiteSliderEvent = Loadable(lazy(() => import('app/views/website/sliderEvent/Detail')));


const IndexWebsiteTentangMyPro = Loadable(lazy(() => import('app/views/website/tentangMyPro/Index')));
const FormWebsiteTentangMyPro = Loadable(lazy(() => import('app/views/website/tentangMyPro/Form')));
const DetailWebsiteTentangMyPro = Loadable(lazy(() => import('app/views/website/tentangMyPro/Detail')));

//[1]

const routesChildren = [
  { path: 'base/base-crud', element: <Index />, auth: authRoles.admin },
  { path: 'base/base-crud/form', element: <Form />, auth: authRoles.admin },
  { path: 'base/base-crud/form/:id', element: <Form />, auth: authRoles.admin },
  { path: 'base/base-crud/detail/:id', element: <Detail />, auth: authRoles.admin },

  { path: 'website/artikel', element: <Artikel />, auth: authRoles.admin },
  { path: 'website/artikel/form', element: <ArtikelForm />, auth: authRoles.admin },
  { path: 'website/artikel/form/:id', element: <ArtikelForm />, auth: authRoles.admin },
  { path: 'website/artikel/detail/:id', element: <ArtikelDetail />, auth: authRoles.admin },

  { path: 'website/slider-event', element: <IndexWebsiteSliderEvent />, auth: authRoles.admin },
  { path: 'website/slider-event/form', element: <FormWebsiteSliderEvent />, auth: authRoles.admin },
  { path: 'website/slider-event/form/:id', element: <FormWebsiteSliderEvent />, auth: authRoles.admin },
  { path: 'website/slider-event/detail/:id', element: <DetailWebsiteSliderEvent />, auth: authRoles.admin },

  { path: 'website/tentang-mypro', element: <IndexWebsiteTentangMyPro />, auth: authRoles.admin },
  { path: 'website/tentang-mypro/form', element: <FormWebsiteTentangMyPro />, auth: authRoles.admin },
  { path: 'website/tentang-mypro/form/:id', element: <FormWebsiteTentangMyPro />, auth: authRoles.admin },
  { path: 'website/tentang-mypro/detail/:id', element: <DetailWebsiteTentangMyPro />, auth: authRoles.admin },
  //[2]
];
export default routesChildren;
