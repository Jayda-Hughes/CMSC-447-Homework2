export default class APIService{
    static updateProject(id,Name)
    {
        return fetch(`http://localhost:5000/update/${id}/`,{
            'method':'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            Name: JSON.stringify(Name)
          })
          .then(resp => resp.json())
    }
    static insertProject(Name)
    {
        return fetch(`http://localhost:5000/add`,{
            'method':'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            Name: JSON.stringify(Name)
          })
          .then(resp => resp.json())
    }

    static DeleteProject(id)
    {
        return fetch(`http://localhost:5000/delete/${id}/`,{
            'method':'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
         
          })
          .then(resp => resp.json())
    }
}