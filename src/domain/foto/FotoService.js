export default class FotoService {

    constructor(resource) {
        this._resource = resource('v1/fotos{/id}');
    }
    lista() {
        return this._resource
            .query()
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Nao foi possivel obter as fotos');
            });
    }
    cadastra(foto) {
        if (foto._id) {
            return this._resource
                .update({ id: foto._id }, foto);
        }
        if (!foto._id) {
            return this._resource
                .save(foto);

            /* if the id already exist we'll update, if not, we will save */
        }

    }
    apaga(id) {
        return this._resource
            .delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error('Nao foi possivel excluir a imagem');
            })
    }
    busca(id) {
        return this._resource
            .get({ id })
            .then(res => res.json());
    }
}
