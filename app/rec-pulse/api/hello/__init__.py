import azure.functions as func

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.function_name(name="hello")
@app.route(route="hello", methods=["GET","POST"])
def hello(req: func.HttpRequest) -> func.HttpResponse:
    name = req.params.get("name")
    if not name:
        try:
            data = req.get_json()
            name = data.get("name")
        except Exception:
            name = None
    msg = f"Hello, {name}!" if name else "Hello from Azure Functions."
    return func.HttpResponse(msg, status_code=200)
