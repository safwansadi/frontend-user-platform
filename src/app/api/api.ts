import { apiBaseUrl, apiKey } from "../utils/env";

interface LoginValues{
  email:string;
  password:string;
}

interface SignUpValues{
  name:string;
  email:string;
  password:string;
}

interface Mission {
  title: string;
  status:string;
  description: string;
  joinLink:string;
}

export const postSignUp = async (uri: string, values: SignUpValues) => {
  try {
    if (!apiKey) {
      throw new Error('API key not found in environment variables');
    }
    const response = await fetch(`${apiBaseUrl}/${uri}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(values), 
    });
    return response;

  } catch (error) {
    console.error('Error calling API:', error);
    return null;
  }
};

export const addMission = async (uri: string, values: Mission) => {
  try {
    if (!apiKey) {
      throw new Error('API key not found in environment variables');
    }
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await fetch(`${apiBaseUrl}/${uri}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
        'x-api-key': apiKey,
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(`Failed to update dashboard: ${response.status} - ${response.statusText}`);
    }

    return response.json(); 

  } catch (error) {
    console.error('Error calling API:', error);
    return null;
  }
};

export const updateMission = async (uri: string, values: Mission) => {
  try {
    if (!apiKey) {
      throw new Error('API key not found in environment variables');
    }
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await fetch(`${apiBaseUrl}/${uri}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
        'x-api-key': apiKey,
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(`Failed to update dashboard: ${response.status} - ${response.statusText}`);
    }

    return response.json(); 

  } catch (error) {
    console.error('Error calling API:', error);
    return null;
  }
};

export const postLogin = async (uri: string, values: LoginValues) => {
  try {
    if (!apiKey) {
      throw new Error('API key not found in environment variables');
    }
    const response = await fetch(`${apiBaseUrl}/${uri}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(values), 
    });
    return response;

  } catch (error) {
    console.error('Error calling API:', error);
    return null;
  }
};

export const getMission = async (uri:string) => {
    try {
      if (!apiKey) {
        throw new Error('API key not found in environment variables');
      }
      const response = await fetch(`${apiBaseUrl}/${uri}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling API:', error);
      return null;
    }
  };

  export const deleteMission = async (uri: string) => {
    try {
      if (!apiKey) {
        throw new Error('API key not found in environment variables');
      }
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }
  
      const response = await fetch(`${apiBaseUrl}/${uri}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
          'x-api-key': apiKey,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete mission: ${response.status} - ${response.statusText}`);
      }
  
      return response.json();
  
    } catch (error) {
      console.error('Error calling API:', error);
      return null;
    }
  };
  


  