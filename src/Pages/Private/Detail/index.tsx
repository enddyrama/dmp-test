import { Row, Col, Card } from "react-bootstrap";
import { useDetailHooks } from "./hooks";
import { useNavigate } from "react-router-dom";

const PageDetail = () => {
    const nav = useNavigate();
    const { job, loading } = useDetailHooks();
    return (
        <div style={{ margin: 20 }}>
            <div
                className="mt-3 mb-3" >
                <div style={{ cursor: "pointer", fontSize: 20, color: "blue" }} onClick={() => nav("/")}>Back</div>
            </div>
            <div>
                <div>{job ? job.type : "-"} / {job ? job.location : "-"}</div>
                <div style={{ fontWeight: 600, fontSize: 28 }}>{job?.company}</div>
            </div>
            <div className="mt-3 mb-3" style={{ border: `1px solid black` }} />
            <Row >
                <Col>
                    {
                        job ?
                            <div dangerouslySetInnerHTML={{ __html: job.description }}></div> : null
                    }
                </Col>
                <Col md={3} style={{}}>
                    <Card style={{}}>
                        <Card.Header>{job?.company}</Card.Header>
                        <Card.Body>
                            <img
                                style={{ width: "100%" }}
                                src={job?.company_logo} alt="companylogo" />
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            {job?.company_url}
                        </Card.Footer>
                    </Card>
                    <Card className="mt-3">
                        <Card.Header>How to Apply</Card.Header>
                        <Card.Body>
                            {
                                job ?
                                    <div dangerouslySetInnerHTML={{ __html: job.how_to_apply }}></div> : null
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>



    )
}

export default PageDetail;