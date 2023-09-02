import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axiosInstance"; // Make sure you have this axios instance configured

export const showtest = createAsyncThunk(
  "student/showtest",
  async ({ stuid }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/selecttest", {
        params: { stu_id: stuid },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showquestion = createAsyncThunk(
  "student/showquestion",
  async ({ testId }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/showquestion", {
        params: { test_id: testId },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const savetestresult = createAsyncThunk(
  "savetestresult",
  async (body) => {
    // console.log(body);
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/savetestresult`,
      body,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data;
  }
);

export const savetestresultdetail = createAsyncThunk(
  "savetestresultdetail",
  async (body) => {
    // console.log(body);
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/savetestresultdetail`,
      body,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data;
  }
);

export const testresult = createAsyncThunk(
  "student/testresult",
  async ({ test_id, stuid }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/testresult", {
        params: { test_id: test_id, stu_id: stuid },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const testedresult = createAsyncThunk(
  "student/testedresult",
  async ({ testId, stuid }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/testedresult", {
        params: { test_id: testId, stu_id: stuid },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const testresultdetail = createAsyncThunk(
  "student/testresultdetail",
  async ({ testId, stuid }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/testresultdetail", {
        params: { test_id: testId, stu_id: stuid },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const selectedtest = createAsyncThunk(
  "selectedtest",
  async ({ testId }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/selectedtest", {
        params: { test_id: testId },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const finishedtest = createAsyncThunk(
  "finishedtest",
  async ({ stuid }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/finishedtest", {
        params: { stu_id: stuid },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    test: [],
    questions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showtest.fulfilled, (state, action) => {
        state.test = action.payload;
      })
      .addCase(showquestion.fulfilled, (state, action) => {
        state.questions = action.payload;
      });
  },
});

export default studentSlice.reducer;
