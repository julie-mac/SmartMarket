const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{
      model: Product
    }]
  })
    .then(categories => {
      res.json(categories);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include : [{
      model: Product
    }]
  })
    .then(category => {
      res.json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })

});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then(category => {
      res.status(201).json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(result => {
      if (result[0] === 0) {
        res.status(404).json({ message: 'No category found with this id!' });
      } else {
        res.status(200).json({ message: 'Category has been updated!' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if (result === 0) {
      res.status(404).json({ message: 'No category found with this id!' });
    } else {
      res.status(200).json({ message: 'Category has been deleted.'})
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
