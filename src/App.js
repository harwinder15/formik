import React, { useEffect } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import { TextField } from "formik-material-ui";
import { array, object, string } from "yup";

function App() {
  const child = { child_name: "", child_age: "" };
  const [show, setShow] = React.useState([]);
  useEffect(() => {
    let savedData = localStorage.getItem("data");
    if (savedData) {
      setShow(JSON.parse(savedData));
    }
  }, []);
  const clearData = () =>{
    localStorage.clear()
    setShow([])
   }
  return (
    <>
      <Container sx={{ bgcolor: "#87c1ff4d", paddingY: 3, marginTop: 5 }}>
        <Typography variant="h3" align="center" component="h2">
          Formik Form
        </Typography>
        <Card sx={{ marginTop: 2 }}>
          <CardContent sx={{ paddingY: 10, paddingX: 5 }}>
            <Formik
              initialValues={{
                name: "",
                age: "",
                phone_number: "",
                child: [child],
              }}
              validationSchema={object({
                name: string("Enter your Name").required("Name is required"),
                age: string("Enter your age")
                  .min(1, "Age should be of minimum 1 characters length")
                  .max(3, "Age should be of maximum 3 characters length")
                  .required("Age is required"),
                phone_number: string("Enter your phone_number")
                  // .min(
                  //   10,
                  //   "Phone Number should be of minimum 10 characters length"
                  // )
                  .max(
                    10,
                    "Phone Number should be of maximum 10 characters length"
                  )
                  .required("Phone Number is required"),
                child: array(
                  object({
                    child_name: string("Enter your child_name").required(
                      "Child Name is required"
                    ),
                    child_age: string("Enter your child_age")
                      .min(
                        1,
                        "Child Age should be of minimum 1 characters length"
                      )
                      .max(
                        2,
                        "Child Age should be of maximum 2 characters length"
                      )
                      .required("Child Name is required"),
                  })
                ),
              })}
              onSubmit={async (values, actions) => {
                console.log(JSON.stringify(values, null, 2));
                setShow([...show, JSON.stringify(values, null, 2)]);
                if (show.length > 0) {
                  localStorage.setItem("data", JSON.stringify(show));
                }
              }}
            >
              {({ values }) => (
                <>
                  <Grid container spacing={2}>
                    <Grid item md={4}>
                      <Field
                        fullWidth
                        name="name"
                        component={TextField}
                        label="Name"
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Field
                        fullWidth
                        name="age"
                        component={TextField}
                        label="Age"
                        type="number"
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Field
                        fullWidth
                        name="phone_number"
                        component={TextField}
                        label="Phone Number"
                        type="number"
                      />
                    </Grid>
                  </Grid>
                  <FieldArray name="child">
                    {({ push, remove }) => (
                      <Grid
                        container
                        spacing={2}
                        sx={{ marginTop: 2, paddingX: 2 }}
                      >
                        <Grid item xs={12}>
                          <Typography variant="h6" component="h2">
                            Add Child
                          </Typography>
                        </Grid>
                        {values.child.map((_, index) => (
                          <>
                            <Grid item md={5}>
                              <Field
                                fullWidth
                                name={`child.${index}.child_name`}
                                component={TextField}
                                label="Child Name"
                              />
                            </Grid>
                            <Grid item md={5}>
                              <Field
                                fullWidth
                                name={`child.${index}.child_age`}
                                component={TextField}
                                label="Child Age"
                                type="number"
                              />
                            </Grid>
                            {index > 0 && (
                              <Grid item md={2}>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </Button>
                              </Grid>
                            )}
                          </>
                        ))}{" "}
                        <Grid item xs={12}>
                          <Button
                            variant="outlined"
                            onClick={() => push(child)}
                          >
                            Add More..
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </FieldArray>
                  <Form>
                    <Stack direction="row" spacing={2} sx={{ marginTop: 5 }}>
                      <Button variant="contained" type="submit">
                        Submit
                      </Button>
                    </Stack>
                  </Form>{" "}
                </>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>
      <div>
        <Container sx={{ bgcolor: "#87c1ff4d", paddingY: 3, marginTop: 5 }}>
          <Typography variant="h3" align="center" component="h2">
            Display Form
          </Typography>
          <Card sx={{ marginTop: 2 }}>
            <CardContent sx={{ paddingY: 10, paddingX: 5 }}>
              <pre>
                <Grid item md={2}>
                  <Button variant="outlined" color="error"  
                  onClick={clearData}
                  >
                    Clear Data
                  </Button>
                </Grid>
              </pre>
              <table>
                <tr>
                  <th>Display Data</th>
                </tr>
                <tr>
                  <td>{show}</td>
                </tr>
                <br />
                <br />
              </table>
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default App;
