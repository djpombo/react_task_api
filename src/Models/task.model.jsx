

function Task (id, name, isConcluded){

    this.id = id;
    this.name = name;
    this.isConcluded = isConcluded;

    return {
        id: id,
        name: name,
        isConcluded: isConcluded
    };
}
export default Task;