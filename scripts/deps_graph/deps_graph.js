/**
 * @param {function()} callback
 * @suppressGlobalPropertiesCheck
 */
function runOnWindowLoad(callback) {
  /**
   * @suppressGlobalPropertiesCheck
   */
  function windowLoaded() {
    window.removeEventListener('DOMContentLoaded', windowLoaded, false);
    callback();
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive')
    callback();
  else
    window.addEventListener('DOMContentLoaded', windowLoaded, false);
}

function run() {

    // create a network
    var container = document.getElementById('graph');

    // provide the data in the vis format
    var data = {
        nodes: nodes.map(n => {return {id: n, label: n}}),
        edges: modules.map(([k, v]) => {return {from: k, to: v}}),
    };
    var options = {
      edges: {
        arrows: "to",
        color: {
          highlight: 'red',
        }
      },
      layout: {
        // improvedLayout: true,
        hierarchical: {
          enabled: false,
          sortMethod: 'directed', // 'directed', 'hubsize'
          direction: 'LR',
        },
      },
      physics: {
        enabled: true,
        // solver:'repulsion',
        barnesHut: {
          springLength: 50,
        },
      },
    };

    // initialize your network!
    var network = new vis.Network(container, {
      nodes: new vis.DataSet(data.nodes),
      edges: new vis.DataSet(data.edges)
    }, options);
}

runOnWindowLoad(run);