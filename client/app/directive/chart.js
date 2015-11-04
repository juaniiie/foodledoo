app.directive('chart', function() {
  return {
    restrict: 'E',
    scope: {
      chart: '='
    },
    link: function(scope, element) {

      console.log('element:', element);

      scope.$watchCollection('chart', function() {
        
        console.log('scope.chart', scope.chart);

        scope.dictionary = {
          CHOLE: 'Cholesterol',
          ENERC_KCAL: 'Calories',
          PROCNT: 'Protein',
          NA: 'Sodium',
          FAT: 'Fat',
          CHOCDF: 'Carbs',
          FIBTG: 'Fiber',
          SUGAR: 'Sugar'
        };
        scope.makeTree = function(nutrientObj) {

          d3.select(element[0].children[1]).select('svg').remove();

          var diameter = 500;
          var counter = 0;
          var root = {};
          root.name = 'Percent';
          root.children = [];
          for (var key in nutrientObj.totalDaily) {
            if (scope.dictionary[key]) {
              var item = {};
              item.name = scope.dictionary[key];
              item.value = nutrientObj.totalDaily[key].quantity.toFixed(0);
              item.group = counter++;
              root.children.push(item);
            }
          }

          var bubble = d3.layout.pack().sort(null).size([diameter, diameter]).padding(1.5);

          bubble.nodes(root);

          var svg = d3.select(element[0].children[1])
                      .append('svg')
                      .attr('viewBox', '0 0 500 500')
                      .attr('perserveAspectRatio', 'xMinYMid')
                      .attr('width', diameter)
                      .attr('height', diameter)
                      .attr('class', 'bubble');

          var node = svg.selectAll('.node')
                        .data(bubble.nodes(root)
                        .filter(function(d) {
                          return !d.children;}))
                        .enter()
                        .append('g')
                        .attr('class', 'node')
                        .attr('transform', function(d) {
                          return 'translate(' + d.x + ',' + d.y + ')'; });

          var color = function(n) {
            var colors = ['#17becf', '#9edae5', '#6baed6', '#fd8d3c', '#fdd0a2', '#3182bd', '#9ecae1', '#e6550d'];
            return colors[n % colors.length];
          };

          node.append('circle')
              .attr('r', function(d) {
                return d.r; })
              .style('fill', function(d) {
                return color(d.group); });
          node.append('text')
              .attr('dy', '.3em')
              .style('text-anchor', 'middle')
              .text(function(d) { return d.name; });
        };

        var chart = $('.bubble');
        var aspect = chart.width() / chart.height();
        var container = chart.parent();

        $(window).on('resize', function() {
          var targetWidth = container.width();
          chart.attr('width', targetWidth);
          chart.attr('height', Math.round(targetWidth / aspect));
        }).trigger('resize');

        if (Object.keys(scope.chart).length !== 0) {
          scope.makeTree(scope.chart);
          console.log('object keys', Object.keys(scope.chart).length);
        }
      });
    },
    templateUrl: 'app/templates/chart.html'
  };
});
