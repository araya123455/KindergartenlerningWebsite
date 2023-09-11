import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// กำหนดเป็นอะไรก็ได้
const initialState = {
  test: 0,
  data: [],
};

export const showtest = createAsyncThunk("showtest", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/test`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});

export const inserttest = createAsyncThunk("inserttest", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/testinsert`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});

export const edittest = createAsyncThunk("edittest", async ({ id, body }) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_APP_API}/testupdate/${id}`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});

export const deletetest = createAsyncThunk("deletetest", async (id, body) => {
  console.log(id, body);
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_API}/testdelete/${id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

export const showtestde = createAsyncThunk("showtestde", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/testde`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});

export const inserttestde = createAsyncThunk("inserttestde", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/testdeinsert`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
export const edittestde = createAsyncThunk("edittestde", async ({ id, body }) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_APP_API}/testdeupdate/${id}`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});

export const deletetestde = createAsyncThunk("deletetestde", async (id, body) => {
  console.log(id, body);
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_API}/testdedelete/${id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

export const showquestion = createAsyncThunk("showquestion", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/question`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});

export const insertquestion = createAsyncThunk("insertquestion", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/questioninsert`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});

export const editquestion = createAsyncThunk("editquestion", async ({ id, body }) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_APP_API}/questionupdate/${id}`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});

export const deletequestion = createAsyncThunk("deletequestion", async (id, body) => {
  // console.log(id, body);
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_API}/questiondelete/${id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

export const attendance = createAsyncThunk("attendance", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/attendance`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});

export const attendancedetail = createAsyncThunk("attendancedetail", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/attendancedetail`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});

export const attendancedetailinsert = createAsyncThunk("attendancedetailinsert", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/attendancedetailinsert`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});

export const attendancedetailupdate = createAsyncThunk("attendancedetailupdate", async ({ id, body }) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_APP_API}/attendancedetailupdate/${id}`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});

export const attendancedelete = createAsyncThunk("attendancedelete", async (id, body) => {
  // console.log(id, body);
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_API}/attendancedelete/${id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

export const TeacherSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: {},
  //   test
  [showtest.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [showtest.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [showtest.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [inserttest.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [inserttest.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [inserttest.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [edittest.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [edittest.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [edittest.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [deletetest.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [deletetest.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [deletetest.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
});
// Action creators are generated for each case reducer function
export const { SET_VALUE } = TeacherSlice.actions;

export default TeacherSlice.reducer;
