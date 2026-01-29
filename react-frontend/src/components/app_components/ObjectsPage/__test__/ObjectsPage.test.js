import React from "react";
import { render, screen } from "@testing-library/react";

import ObjectsPage from "../ObjectsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders objects page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ObjectsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("objects-datatable")).toBeInTheDocument();
    expect(screen.getByRole("objects-add-button")).toBeInTheDocument();
});
