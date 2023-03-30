import { describe, expect, it, test } from "vitest";
import {render, screen} from '@testing-library/react';

import Map from "../components/Map";
import ReviewsModal from "../components/ReviewsModal";

describe("should render ReviewsModal", () => {
    test("render ReviewsModal given a school and user", () => {
        render(<ReviewsModal name="Bayside High School"
            onClose={() => this.setState({ modal: false })}
            user="Bob"
            role="student"
            uid="asdioasdjasiodjasdiojasdoiasoadjasiodjasiosjadaosjiadas"
            verified={true}>

            </ReviewsModal>)
    })
})
