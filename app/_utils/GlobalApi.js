import { gql, request } from 'graphql-request'

const MASTER_UTL ='https://eu-west-2.cdn.hygraph.com/content/'+process.env.NEXT_PUBLIC_HYGRAPH_API_KEY+'/master';

const getAllCourseList = async () => {
    const query = gql`
    query MyQuery {
        courseLists {
            name
            id
            free
            description
            banner {
                url
            }
            chapter {
                ... on Chapter {
                    id
                    name
                    video {
                        url
                    }
                }
            }
            totalChapters
            tag
            slug
        }
    }
    `

    const result = await request(MASTER_UTL, query);

    return result;
}

const getAllTask = async () =>{
    const query = gql`
    query getTask {
        taskManagers {
            judul
            deadline
        }
    }
    `
    const result = await request(MASTER_UTL, query);

    return result;
}

const getCourseById = async (courseId) =>{
    const query = gql`
    query getCourseById {
        courseList(where: {slug: "kimia-dasar"}) {
        banner {
        url
        }
        chapter {
        ... on Chapter {
            id
            name
            video {
            url
            }
            youtubeUrl
        }
        }
        description
        free
        id
        name
        slug
        tag
        totalChapters
    }
    }
    `

    const result = await request(MASTER_UTL, query);
    return result;
}

const userDetailInformation = async (courseId,email)=>{
    const query = gql`
    mutation MyMutation {
        createUserDetail(
            data: {courseId: "`+courseId+`", userEmail: "`+email+`", courseList: {connect: {slug: "`+courseId+`"}}}
        ) {
            courseId
            id
        }
        publishManyCourseListsConnection {
            edges {
            node {
                id
            }
            }
        }
    }`

    const result = await request(MASTER_UTL, query);
    return result;
}

const createTask = async (title, dueDate) => {
    const createTaskMutation = gql`
    mutation createTask($title: String!, $dueDate: DateTime!) {
        createTaskManager(data: { judul: $title, deadline: $dueDate }) {
            id
            judul
            deadline
        }
    }`;

    const publishTaskMutation = gql`
    mutation publishTask($id: ID!) {
        publishTaskManager(where: { id: $id }) {
            id
            stage
        }
    }`;

    try {
        const result = await request(MASTER_UTL, createTaskMutation, { title, dueDate });
        const taskId = result.createTaskManager.id;

        if (taskId) {
            await request(MASTER_UTL, publishTaskMutation, { id: taskId });
        }

        return result;
    } catch (error) {
        console.error("Error in createTask mutation:", error);
        throw error;
    }
};

const updateTaskCompletion = async (id, completed) => {
    const mutation = gql`
      mutation UpdateTaskCompletion($id: ID!, $completed: Boolean!) {
        updateTaskManager(where: { id: $id }, data: { completed: $completed }) {
          id
          completed
        }
      }
    `;
  
    const publishMutation = gql`
      mutation PublishTask($id: ID!) {
        publishTaskManager(where: { id: $id }) {
          id
        }
      }
    `;
  
    try {
      await request(MASTER_URL, mutation, { id, completed });
      await request(MASTER_URL, publishMutation, { id });
    } catch (error) {
      console.error("Error updating task completion status:", error);
    }
  };

export default {
    getAllCourseList,
    getAllTask,
    getCourseById,
    userDetailInformation,
    createTask,
    updateTaskCompletion
};