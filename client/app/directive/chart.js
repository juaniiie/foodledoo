app.directive('chart', function() {
  return {
    restrict: 'E',
    scope: {
      chart: '='
    },
    link: function(scope) {

      scope.$watchCollection('chart', function() {
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
          d3.select('svg').remove();
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
          var width = $('svg').parent().width();
          console.log('svg parent', $('svg').parent());
          var height = $('svg').parent().height();
          console.log($('svg').parent().height())

          var bubble = d3.layout.pack().sort(null).size([400, 400]).padding(1.5);

          bubble.nodes(root);

          var svg = d3.select('.bubbleChart')
                      .append('svg')
                      .attr('width', 450)
                      .attr('height', 400)
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

        // if (scope.chart.labels) {
        //   for (var i = 0; i < scope.chart.labels.length; i++) {
        //     scope.chart.labels[i] = (scope.chart.labels[i].toLowerCase()).replace(/_/g, ' ');
        //   }
        // }
        if (Object.keys(scope.chart).length !== 0) {
          scope.makeTree(scope.chart);
        }

      });
    },
    templateUrl: 'app/templates/chart.html'
  };
});
