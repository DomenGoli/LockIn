// const API_URL = "http://localhost:9000/days";
const API_URL = "https://json-server-lockin-8.onrender.com/days"

export async function getDaysApi() {
    const res = await fetch(API_URL);
    if (!res.ok) throw Error("Server je off-line");

    const data = await res.json();
    return data;
}

export async function createDayApi(newDay: object) {
    const res = await fetch(`${API_URL}`, {
        method: "POST",
        body: JSON.stringify(newDay),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
}

export async function deleteDayApi(id: string) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
}

// export async function deleteActApi(name: string) {
//     const days = await getDaysApi();
//     const allIds = days.map((day) => day.id);
//     allIds.forEach((element) => {
//         const res = await fetch(API_URL)
//     });
// }
