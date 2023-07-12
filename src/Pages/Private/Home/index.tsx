import { Badge, Button, Col, Container, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import { useHomeHooks } from "./hooks";
import { JobsTypes } from "./types";
import { getLastActive } from "../../../Utils/GetLastActive";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PageHome = () => {
    const nav = useNavigate();
    const { loading, jobs, loadingMore, fetchLoadMore, error, description, setDescription, location, setLocation, fullTime, setFullTime, fetchJob, search, handleSearch } = useHomeHooks();
    console.log("jop", jobs)
    return (
        <div style={{ margin: 20 }}>
            <Form>
                <Row>
                    <Col style={{}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control
                                onChange={(a) => setDescription(a.target.value)}
                                value={description} type="description"
                                placeholder="Filter by title, benefits, companies, expertise" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                onChange={(a) => setLocation(a.target.value)}
                                value={location} type="location"
                                placeholder="Filter by city, state, zip code or country" />
                        </Form.Group>
                    </Col>
                    <Col style={{}}>
                        <Form.Label style={{ opacity: 0 }}>Email address</Form.Label>
                        <Form.Check // prettier-ignore
                            type={"checkbox"}
                            onChange={(a) => setFullTime(!fullTime)}
                            checked={fullTime}
                            label={`Full Time Only`}
                            style={{ marginTop: 5 }}
                        />
                    </Col>
                    <Col style={{}}>
                        <Form.Label style={{ opacity: 0 }}>Button</Form.Label>
                        <div className="d-grid" style={{ background: "yellow", display: "flex", flex: 1 }}>
                            <Button variant="primary" onClick={() => handleSearch()} >
                                Search
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
            <div className="mt-3" >
                <div style={{ margin: 10, fontWeight: 600, fontSize: 22 }}>
                    {search ? `Showing ${jobs.filter(job => job !== null).length} result` : "Job List"}
                </div>
                <ListGroup style={{ paddingBottom: 20 }}>
                    {
                        loading ?
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Spinner animation="border" role="status" variant="primary" />
                            </div>
                            :
                            jobs && jobs.length > 0 ? jobs.filter(job => job !== null).map((job: JobsTypes, index: any) => (
                                job &&
                                <ListGroup.Item
                                    key={index}
                                    action
                                    className="d-flex justify-content-between align-items-start"
                                    onClick={() => nav(`/${job.id}`)}
                                >
                                    <div className="">
                                        <div className="fw-bold">{job.title}</div>
                                        <div>{job.company} - <span style={{ fontWeight: 600, color: "blue" }}>{job.type}</span></div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                        <div>{job.company}</div>
                                        <div>{getLastActive(job.created_at)}</div>
                                    </div>
                                </ListGroup.Item>
                            ))
                                :
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <div>No Data Available</div>
                                </div>
                    }
                </ListGroup>
                {
                    loading ?
                        null :

                        !error ?
                            <div className="d-grid pb-3">
                                <Button variant="primary" disabled={loadingMore} onClick={fetchLoadMore}>
                                    {loadingMore ? 'Loading…' : 'Load More'}
                                </Button>
                            </div>
                            :
                            null
                }

            </div>
        </div>
    )
}

export default PageHome;