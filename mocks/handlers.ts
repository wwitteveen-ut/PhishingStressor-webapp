import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('http://localhost/api/users', () => {
        return HttpResponse.json([
            { id: 1, name: 'John Smith' },
            { id: 2, name: 'Jane Smith' },
        ])
    }),
]