import { validationResult } from 'express-validator';

import { Add } from "../data/models/add.mjs";

/**
 * Devuelve los anuncios guardados.
 */
function getAdds(req, res) {
    const result = validationResult(req);
    console.log(result.errors);    
    if (result.errors.length == 0) {
        const filters = req.query;
        /**
         * Filtros.
         */
        let generatedFilter = {};
        if (filters.tags != null) {
            generatedFilter["tags"] = filters.tags;
        }
        if (filters.status != null) {
            generatedFilter["status"] = filters.status;
        }
        if (filters.name != null) {
            generatedFilter["name"] = {$regex : "^" + filters.name};
        }
        if (filters.pricemin != null && filters.pricemax != null) {
            generatedFilter["price"] = {$gte: filters.pricemin, $lte: filters.pricemax};
        } else if (filters.pricemin != null) {
            generatedFilter["price"] = {$gte: filters.pricemin};
        } else if (filters.pricemax != null) {
            generatedFilter["price"] = {$lte: filters.pricemax};
        }    
        /**
         * Paginación.
         */
        let start = null;
        let limit = null;
        if (filters.start != null) {
            start = filters.start;
        }
        if (filters.limit != null) {
            limit = filters.limit;
        }

        let sort = null;
        if (filters.sort == null) {
            sort = {
                name: 'asc'
            };            
        } else {
            sort = {};
            sort[filters.sort] = "asc";
        }
        console.log(sort);

        if (limit == null) {
            Add.find(generatedFilter)
               .sort(sort)
               .exec(function(err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
                });  
        } else {
            if (start == null) {
                start = 0;
            }
            Add.find(generatedFilter)
            .limit(limit)
            .skip(start)
            .sort(sort)
            .exec(function(err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
                });  
        }
    } else {
        res.status(400).json(result.errors);
    }
}

/*
 * Crea un nuevo anuncio.
 * Si hay algún error en la información del anuncio a crear devuelve un error 400.
 */
function createAdd(req, res) { 
    const result = validationResult(req);
    console.log(result.errors);    
    if (result.errors.length == 0) {
        const post = new Add({
            name: req.body.name,
            status: req.body.status,
            price: req.body.price,
            image: req.body.image,
            tags: req.body.tags
        });
        post.save(function (err) {
            if (err) console.log(err);
            res.json(post);
        });    
    } else {
        res.status(400).json(result.errors);
    }
}

/**
 * Devuelve las tags usadas.
 */
function getTags(req, res) {
    Add.find({}, function(err, result) {
        if (err) {
          res.send(err);
        } else {            
            const tags = new Set();
            result.forEach(element => {                
                if (element.tags != null) {
                    element.tags.split(",").forEach(possibleTag => {
                        tags.add(possibleTag);               
                    });
                }
            });
            res.send({"tags": Array.from(tags).join(', ')});
        }
    });  
};
 
export { getAdds, createAdd, getTags };