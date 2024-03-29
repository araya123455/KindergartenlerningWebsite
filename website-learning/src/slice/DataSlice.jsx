import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
// กำหนดเป็นอะไรก็ได้
const initialState = {
  test: 0,
  data: [],
};

export const teacherlogin = createAsyncThunk("teacherlogin", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/teacher/login`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log(response);
  return response.data;
});
export const adminlogin = createAsyncThunk("adminlogin", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/admin/login`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});
export const studentlogin = createAsyncThunk("studentlogin", async (body) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/student/login`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});
export const register = createAsyncThunk("register", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/register`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});
export const showadmin = createAsyncThunk("showadmin", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API}/admindata`,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
// Admin Page
export const getDataAll = createAsyncThunk("getDataAll", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/yearterm`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});
export const insertyearterm = createAsyncThunk(
  "insertyearterm",
  async (body) => {
    console.log(body);
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/yearterminsert`,
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
export const edityearterm = createAsyncThunk(
  "edityearterm",
  async ({ id, body }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/yeartermupdate/${id}`,
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
export const deleteyeraterm = createAsyncThunk(
  "deleteyeraterm",
  async (id, body) => {
    // console.log(id, body);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/yeartermdelete/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the 400 Bad Request error here
        // console.log("Can't delete");
        throw new Error(
          "ไอดีของปีการศึกษานี้ถูกผูกกับตารางอื่นอยู่ไม่สามารถทำการลบได้"
        );
      } else {
        throw new Error("An error occurred while deleting the item.");
      }
    }
  }
);
export const showkinroom = createAsyncThunk("showkinroom", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API}/kinderroom`,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
export const insertkinroom = createAsyncThunk("insertkinroom", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/kinroominsert`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
export const editkinroom = createAsyncThunk(
  "editkinroom",
  async ({ id, body }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/kinroomupdate/${id}`,
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
export const deletekinroom = createAsyncThunk(
  "deletekinroom",
  async (id, body) => {
    // console.log(id, body);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/kinroomdelete/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the 400 Bad Request error here
        // console.log("Can't delete");
        throw new Error(
          "ไอดีของชั้นเรียนนี้ถูกผูกตารางอื่นอยู่ไม่สามารถทำการลบได้"
        );
      } else {
        throw new Error("An error occurred while deleting the item.");
      }
    }
  }
);
export const showteacher = createAsyncThunk("showteacher", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/teacher`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});
export const showteacherposi = createAsyncThunk("showteacherposi", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API}/teacherposi`,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
export const insertteacher = createAsyncThunk("insertteacher", async (body) => {
  // console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/teacherinsert`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
export const editteacher = createAsyncThunk(
  "editteacher",
  async ({ id, body }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/teacherupdate/${id}`,
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
export const deleteteacher = createAsyncThunk(
  "deleteteacher",
  async (id, body) => {
    // console.log(id, body);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/teacherdelete/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the 400 Bad Request error here
        // console.log("Can't delete");
        throw new Error("ไอดีของครูถูกผูกกับตารางอื่นอยู่ไม่สามารถลบได้");
      } else {
        throw new Error("An error occurred while deleting the item.");
      }
    }
  }
);
export const manageStudent = createAsyncThunk("manageStudent", async (body) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/admin/mgtStudent`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});
export const showstudent = createAsyncThunk("showstudent", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/student`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});
export const insertstudent = createAsyncThunk("insertstudent", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/studentinsert`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
export const editstudent = createAsyncThunk(
  "editstudent",
  async ({ id, body }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/studentupdate/${id}`,
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
export const deletestudent = createAsyncThunk(
  "deletestudent",
  async (id, body) => {
    console.log(id, body);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/studentdelete/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the 400 Bad Request error here
        // console.log("Can't delete");
        throw new Error("ไอดีของนักเรียนถูกผูกกับตารางอื่นอยู่ไม่สามารถลบได้");
      } else {
        throw new Error("An error occurred while deleting the item.");
      }
    }
  }
);
export const showsyllabus = createAsyncThunk("showsyllabus", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/syllabus`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});
export const insertsyllabus = createAsyncThunk(
  "insertsyllabus",
  async (body) => {
    console.log(body);
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/syllabusinsert`,
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
export const editsyllabus = createAsyncThunk(
  "editsyllabus",
  async ({ id, body }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/syllabusupdate/${id}`,
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
export const deletesyllabus = createAsyncThunk(
  "deletesyllabus",
  async (id, body) => {
    // console.log(id, body);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/syllabusdelete/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the 400 Bad Request error here
        // console.log("Can't delete");
        throw new Error(
          "ไอดีของหลักสูตรนี้ถูกผูกกับตารางอื่นอยู่ไม่สามารถทำการลบได้"
        );
      } else {
        throw new Error("An error occurred while deleting the item.");
      }
    }
  }
);
export const showsubject = createAsyncThunk("showsubject", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/subject`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});
export const insertsubject = createAsyncThunk("insertsubject", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/subjectinsert`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
export const editsubject = createAsyncThunk(
  "editsubject",
  async ({ id, body }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/subjectupdate/${id}`,
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
export const deletesubject = createAsyncThunk(
  "deletesubject",
  async (id, body) => {
    // console.log(id, body);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/subjectdelete/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the 400 Bad Request error here
        // console.log("Can't delete");
        throw new Error(
          "ไอดีของวิชานี้ผูกอยู่กับตารางอื่นอยู่ไม่สามารถทำการลบได้"
        );
      } else {
        throw new Error("An error occurred while deleting the item.");
      }
    }
  }
);
export const showclasstime = createAsyncThunk("showclasstime", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API}/classtime`,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
export const insertclasstime = createAsyncThunk(
  "insertclasstime",
  async (body) => {
    console.log(body);
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/classtimeinsert`,
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
export const editclasstime = createAsyncThunk(
  "editclasstime",
  async ({ id, body }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/classtimeupdate/${id}`,
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
export const deleteclasstime = createAsyncThunk(
  "deleteclasstime",
  async (id, body) => {
    // console.log(id, body);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/classtimedelete/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the 400 Bad Request error here
        // console.log("Can't delete");
        throw new Error(
          "ไอดีของตารางสอนนี้ถูกผูกอยู่กับตารางอื่นอยู่ไม่สามารถทำการลบได้"
        );
      } else {
        throw new Error("An error occurred while deleting the item.");
      }
    }
  }
);
export const showclass = createAsyncThunk("showclass", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/class`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});
export const insertclass = createAsyncThunk("insertclass", async (body) => {
  console.log(body);
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/classinsert`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
export const editclass = createAsyncThunk("editclass", async ({ id, body }) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_APP_API}/classupdate/${id}`,
    body,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
export const deleteclass = createAsyncThunk("deleteclass", async (id, body) => {
  // console.log(id, body);
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API}/classdelete/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Handle the 400 Bad Request error here
      // console.log("Can't delete");
      throw new Error(
        "ไอดีของห้องเรียนนี้ถูกผูกอยู่กับตารางอื่นอยู่ไม่สามารถทำการลบได้"
      );
    } else {
      throw new Error("An error occurred while deleting the item.");
    }
  }
});

export const showqualification = createAsyncThunk(
  "showqualification",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/qualification`,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data;
  }
);
// qualification **************
export const insertqualification = createAsyncThunk(
  "insertqualification",
  async ({ id, body }) => {
    console.log(body);
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/qualificationinsert/${id}`,
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
export const editqualification = createAsyncThunk(
  "editqualification",
  async ({ id, body }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/qualificationupdate/${id}`,
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
export const deletequalification = createAsyncThunk(
  "deletequalification",
  async (id, body) => {
    console.log(id, body);
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API}/qualificationdelete/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);
// searchclasstime
export const searchclasstime = createAsyncThunk("searchclasstime", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API}/searchclasstime`,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});

// searchstuclass
export const searchstuclass = createAsyncThunk("searchstuclass", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API}/searchstuclass`,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});

//slice irin
// video
export const learningvideo = createAsyncThunk("learningvideo", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API}/learningvideo`,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});

// PDF
export const fetchPdf = createAsyncThunk("fetchPdf", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/pdf`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});

const pdfSlice = createSlice({
  name: "pdf",
  initialState: {
    files: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPdf.fulfilled, (state, action) => {
      state.files = action.payload;
    });
  },
});

//file PDF English
export const fetchPdfEnglish = createAsyncThunk("fetchPdfEnglish", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/pdf`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});

const pdfSliceEnglish = createSlice({
  name: "pdf",
  initialState: {
    files: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPdfEnglish.fulfilled, (state, action) => {
      state.files = action.payload;
    });
  },
});
//file PDF Enhance
export const fetchPdfEnhance = createAsyncThunk("fetchPdfEnhance", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/pdf`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});

const pdfSliceEnhance = createSlice({
  name: "pdf",
  initialState: {
    files: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPdfEnhance.fulfilled, (state, action) => {
      state.files = action.payload;
    });
  },
});
//file PDF Math
export const fetchPdfMath = createAsyncThunk("fetchPdfMath", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/pdf`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});

const pdfSliceMath = createSlice({
  name: "pdf",
  initialState: {
    files: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPdfMath.fulfilled, (state, action) => {
      state.files = action.payload;
    });
  },
});
//file PDF Thai
export const fetchPdfThai = createAsyncThunk("fetchPdfThai", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/pdf`, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
  return response.data;
});

const pdfSliceThai = createSlice({
  name: "pdf",
  initialState: {
    files: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPdfThai.fulfilled, (state, action) => {
      state.files = action.payload;
    });
  },
});
//---------------------End PDF-----------------------

//--------------assessment----------------
export const showassessment = createAsyncThunk("showassessment", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API}/assessment`,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});

export const insertassessment = createAsyncThunk(
  "insertassessment",
  async (body) => {
    // console.log(body);
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/assessmentinsert`,
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

export const editassessment = createAsyncThunk(
  "editassessment",
  async ({ id, body }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/assessmentupdate/${id}`,
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

export const deleteassessment = createAsyncThunk(
  "deleteassessment",
  async (id, body) => {
    // console.log(id, body);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/assessmentdelete/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the 400 Bad Request error here
        // console.log("Can't delete");
        throw new Error(
          "ไอดีของประเมินนี้ผูกอยู่กับตารางอื่นไม่สามารถทำการลบได้"
        );
      } else {
        throw new Error("An error occurred while deleting the item.");
      }
    }
  }
);

export const showassessmentstu = createAsyncThunk(
  "showassessmentstu",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/assessmentstu`,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return response.data;
  }
);

export const assessmentstuinsert = createAsyncThunk(
  "assessmentstuinsert",
  async (body) => {
    // console.log(body);
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/assessmentstuinsert`,
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

export const assessmentstuupdate = createAsyncThunk(
  "assessmentstuupdate",
  async ({ id, body }) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/assessmentstuupdate/${id}`,
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

export const assessmentstudelete = createAsyncThunk(
  "assessmentstudelete",
  async (id, body) => {
    // console.log(id, body);
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API}/assessmentstudelete/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const searchdirector = createAsyncThunk("searchdirector", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API}/searchdirector`,
    {
      headers: {
        "Content-Type": "Application/json",
      },
    }
  );
  return response.data;
});
//----------end assessment-------------
export const dataTableSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: {},
  //   adminlogin
  [adminlogin.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [adminlogin.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [adminlogin.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  // School Year Term
  [getDataAll.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [getDataAll.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [getDataAll.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [insertyearterm.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [insertyearterm.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [insertyearterm.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [edityearterm.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [edityearterm.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [edityearterm.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [deleteyeraterm.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [deleteyeraterm.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [deleteyeraterm.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  // Manage Teacher
  [showteacher.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [showteacher.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [showteacher.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [insertteacher.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [insertteacher.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [insertteacher.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [editteacher.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [editteacher.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [editteacher.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [deleteteacher.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [deleteteacher.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [deleteteacher.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  // Manage Student
  [manageStudent.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [manageStudent.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [manageStudent.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [showstudent.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [showstudent.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [showstudent.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [insertstudent.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [insertstudent.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [insertstudent.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [editstudent.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [editstudent.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [editstudent.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [deletestudent.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [deletestudent.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [deletestudent.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  // syllabus
  [showsyllabus.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [showsyllabus.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [showsyllabus.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [insertsyllabus.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [insertsyllabus.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [insertsyllabus.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [editsyllabus.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [editsyllabus.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [editsyllabus.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [deletesyllabus.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [deletesyllabus.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [deletesyllabus.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  // classroom timetable
  [showclasstime.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [showclasstime.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [showclasstime.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [insertclasstime.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [insertclasstime.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [insertclasstime.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [editclasstime.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [editclasstime.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [editclasstime.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [deleteclasstime.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [deleteclasstime.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [deleteclasstime.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  // class
  [showclass.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [showclass.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [showclass.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [insertclass.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [insertclass.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [insertclass.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [editclass.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [editclass.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [editclass.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [deleteclass.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [deleteclass.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [deleteclass.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  //   teacherlogin
  [teacherlogin.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [teacherlogin.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [teacherlogin.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  //   studentlogin
  [studentlogin.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [studentlogin.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [studentlogin.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  //   register
  [register.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [register.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [register.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  //linksvedio
  [learningvideo.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [learningvideo.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [learningvideo.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  //learningfilepdf
  [fetchPdf.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [fetchPdf.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [fetchPdf.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  //subject English
  [fetchPdfEnglish.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [fetchPdfEnglish.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [fetchPdfEnglish.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  //subject Enhance
  [fetchPdfEnhance.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [fetchPdfEnhance.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [fetchPdfEnhance.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  //subject Math
  [fetchPdfMath.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [fetchPdfMath.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [fetchPdfMath.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  //subject Thai
  [fetchPdfThai.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [fetchPdfThai.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [fetchPdfThai.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  //--------------------End PDF----------------------------
  //---------assessment-----------
  [showassessment.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [showassessment.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [showassessment.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [insertassessment.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [insertassessment.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [insertassessment.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [editassessment.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [editassessment.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [editassessment.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  [deleteassessment.pending]: (state) => {
    state.loading = true;
    state.error = "";
  },
  [deleteassessment.fulfilled]: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  [deleteassessment.rejected]: (state, action) => {
    state.error = action.error;
    state.loading = false;
  },
  //---------end assessment------------
});

// Action creators are generated for each case reducer function
export const { SET_VALUE } = dataTableSlice.actions;

export default dataTableSlice.reducer;
