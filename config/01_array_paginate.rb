# для гема will_paginate, для постраничного вывода группированных объектов
# без этого будет выдавать ошибку:
# undefined method `total_pages' for #<Array:0x00005588c4efef50>
require 'will_paginate/array'