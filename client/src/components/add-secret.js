import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AddSecret() {
  const [form, setForm] = useState({
    secret: "",
    expireAfter: 0,
  });

  // updating state
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // handle submission
  async function onSubmit(e) {
    e.preventDefault();

    const newSecret = new FormData();
    newSecret.append("secret", form.secret);
    newSecret.append("expireAfter", form.expireAfter);

    const secretResponse = await fetch("http://localhost:5000/v1/secret", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(newSecret),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    //setSecret(secretResponse);
    console.log(secretResponse);

    setForm({
      secret: "",
      expireAfter: 0,
    });
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="secret">
          <Form.Label>Secret</Form.Label>
          <Form.Control
            required
            type="text"
            value={form.secret}
            onChange={(e) => updateForm({ secret: e.target.value })}
            placeholder="Enter your secret"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="expireAfter">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="number"
            value={form.expireAfter}
            onChange={(e) => updateForm({ expireAfter: e.target.value })}
            aria-describedby="expireAfterHelp"
          />
          <Form.Text id="expireAfterHelp" muted>
            Type in after how many seconds your secret should expire.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
