import axios from 'axios';

export default {
	async createFile({ yearId, fileName, fileUrl }) {
		const { data } = await axios.post('/api/file', { yearId, fileName, fileUrl });

		return data;
	},

	async getFiles(yearFieldId) {
		const { data } = await axios.get('/api/files', {
			params: {
				id: yearFieldId,
			},
		});

		return data;
	},

	async deleteFile(fileId) {
		const { data } = await axios.delete('/api/file', {
			params: { id: fileId },
		});

		return data;
	},

	async updateFile({ fileName, fileUrl, id }) {
		const { data } = await axios.post('/api/upd-file', { fileName, fileUrl, fileId: id });

		return data;
	},
};
