import React, { useState, useRef, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ContentService from "../services/ContentService";
import { Editor, OriginalTools } from 'react-bootstrap-editor';

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};

const summaryValidation = (value) => {
    if (value.length < 30) {
        return (
            <div className="invalid-feedback d-block">
                The Summary should more than 20 word.
            </div>
        );
    }
};

const titleValidation = (value) => {
    if (value.length < 10) {
        return (
            <div className="invalid-feedback d-block">
                The title should more than 10 word.
            </div>
        );
    }
};

const detailValidatione = (value) => {
    if (value.length < 50) {
        return (
            <div className="invalid-feedback d-block">
                The title should more than 50 word.
            </div>
        );
    }
};

const UploadContent = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const {contentId} = useParams();
    const navigate = useNavigate();

    const [page, setPage] = useState("");
    const [con, setContent] = useState({});
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [contentType, setcontentType] = useState("");
    const [detail, setDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(async() => {
        
        if (contentId) {
            const content = await ContentService.getContent(contentId);
            if(content){
                setContent(content);
                setTitle(content.title)
                setSummary(content.summary)
                setcontentType(content.contentCategory.id)
                setDetails(content.detail)
                setPage("edit")
            }
        }
      }, []);

    const onChangetitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const onChangeSummary = (e) => {
        const summary = e.target.value;
        setSummary(summary);
    };

    const onContentSelection = (e) => {
        const contentType = e.target.value;
        setcontentType(contentType);
    };

    const onDetailChange = (e) => {
        console.log(e)
        setDetails(e);
    };

    const OnContentUpload = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            if(page =="edit"){
                ContentService.editContent(title, summary, contentType, detail, con.id).then(
                    () => {
                        navigate("/dashboard");
                        window.location.reload();
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
    
                        setLoading(false);
                        setMessage(resMessage);
                    }
                );
            } else{
                ContentService.addContent(title, summary, contentType, detail).then(
                    () => {
                        navigate("/dashboard");
                        window.location.reload();
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
    
                        setLoading(false);
                        setMessage(resMessage);
                    }
                );
            }
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="col-md-10">
                <div className="card card-container">
                    <h2>Upload a new content.......</h2>
                    <br />
                    <Form onSubmit={OnContentUpload} ref={form}>
                        <div className="form-group col-md-9">
                            <label htmlFor="title">Title</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={onChangetitle}
                                validations={[required, titleValidation]}
                            />
                        </div>

                        <div className="form-group col-md-9">
                            <label htmlFor="summary">Summary</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="summary"
                                value={summary}
                                onChange={onChangeSummary}
                                validations={[required, summaryValidation]}
                            />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="detail">Detail</label>
                            <Editor
                            
                             className="form-control"
                             name="detail"   
                             tools={OriginalTools}
                             value={detail}
                             onChange={onDetailChange}
                            />
                        </div>


                        <div className="form-group col-md-9">

                            <select value={contentType} onChange={onContentSelection} className="form-select" aria-label="Default select example">
                                <option selected >Select Content type</option>
                                <option value="1">ML/AL</option>
                                <option value="2">Big-Data</option>
                                <option value="3">Micro-services</option>
                            </select>
                        </div>

                        <div className="form-group col-md-6">
                            <button className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Upload Content</span>
                            </button>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
            </div>
        </div>
    );

}


export default UploadContent;