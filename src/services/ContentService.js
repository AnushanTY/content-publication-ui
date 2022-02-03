import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://ec2-3-83-2-143.compute-1.amazonaws.com//api/content/";

const getPublicContent = () => {
  return axios.get(API_URL + "allcontent", { headers: authHeader() })
};

const getContentByUserId = () => {
  return axios.get(API_URL + "getcontentbyuserid", { headers: authHeader() })
};

const getContent = (contentId) => {
  return axios.get(API_URL + "getcontent", {
    params: {
      contentId: contentId
    },
    headers: authHeader()
  }).then((res) => {
    return res.data.object;
  });
};

const publishContent = (contentId, status) => {
  return axios.get(API_URL + "publishcontent", {
    params: {
      contentId: contentId,
      status :status
    },
    headers: authHeader()
  }).then((res) => {
    return res.data.object;
  });
};

const deleteContent = (contentId, status) => {
  return axios.get(API_URL + "deletecontent", {
    params: {
      contentId: contentId
    },
    headers: authHeader()
  }).then((res) => {
    return res.data.object;
  });
};

const addContent = (title, summary, categoryId, detail) => {
  return axios.post(API_URL + "addcontent", {
    title,
    summary,
    categoryId,
    detail
  }, { headers: authHeader() });
};

const editContent = (title, summary, categoryId, detail, contentId) => {
  return axios.post(API_URL + "editcontent", {
    title,
    summary,
    categoryId,
    detail,
    contentId
  }, { headers: authHeader() });
};


const ContentService = {
  getPublicContent,
  addContent,
  editContent,
  publishContent,
  deleteContent,
  getContent,
  getContentByUserId
}

export default ContentService;